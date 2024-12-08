import express, { type Request, type Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// Types
interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

interface PopulationData {
  year: string;
  value: number;
}

interface CountryDetails {
  borderCountries: CountryInfo[];
  populationData: PopulationData[];
  flagUrl: string;
}

// Middleware
app.use(express.json());
app.use(cors());

// Get Available Countries
app.get('/api/countries', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Get Country Details
app.get('/api/countries/:countryCode', async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.params;

    // Get country info and borders
    const countryInfoResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );

    // Get population data
    const populationResponse = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/population',
      {
        country: countryInfoResponse.data.commonName
      }
    );

    // Get flag URL
    const flagResponse = await axios.post(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
      {
        country: countryInfoResponse.data.commonName
      }
    );

    const countryDetails: CountryDetails = {
      borderCountries: countryInfoResponse.data,
      populationData: populationResponse.data.data.populationCounts,
      flagUrl: flagResponse.data.data.flag
    };

    res.json(countryDetails);
  } catch (error) {
    console.error('Error fetching country details:', error);
    res.status(500).json({ error: 'Failed to fetch country details' });
  }
});

// Move the app.listen to a separate file if running the server directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
