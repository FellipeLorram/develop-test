import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import request from 'supertest';
import app from './server'; 

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn>, post: ReturnType<typeof vi.fn> };

describe('Country API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/countries', () => {
    it('should return list of countries', async () => {
      const mockCountries = [
        { countryCode: 'US', name: 'United States' },
        { countryCode: 'CA', name: 'Canada' }
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockCountries });

      const response = await request(app)
        .get('/api/countries')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual(mockCountries);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://date.nager.at/api/v3/AvailableCountries'
      );
    });

    it('should handle errors when fetching countries', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const response = await request(app)
        .get('/api/countries')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual({ error: 'Failed to fetch countries' });
    });
  });

  describe('GET /api/countries/:countryCode', () => {
    it('should return country details', async () => {
      const mockCountryInfo = {
        commonName: 'Ukraine',
        officialName: 'Ukraine',
        countryCode: 'UA',
        region: 'Europe',
        borders: ['RU', 'BY', 'PL']
      };

      const mockPopulationData = {
        data: {
          populationCounts: [
            { year: '2020', value: 44000000 },
            { year: '2021', value: 44500000 }
          ]
        }
      };

      const mockFlagData = {
        data: {
          data: {
            flag: 'https://example.com/flag.png'
          }
        }
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockCountryInfo });
      mockedAxios.post
        .mockResolvedValueOnce({ data: mockPopulationData })
        .mockResolvedValueOnce({ data: mockFlagData });

      const response = await request(app)
        .get('/api/countries/UA')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        borderCountries: mockCountryInfo,
        populationData: mockPopulationData.data.populationCounts
      });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://date.nager.at/api/v3/CountryInfo/UA'
      );
    });

    it('should handle errors when fetching country details', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      const response = await request(app)
        .get('/api/countries/UA')
        .expect('Content-Type', /json/)
        .expect(500);

      expect(response.body).toEqual({ error: 'Failed to fetch country details' });
    });
  });
}); 