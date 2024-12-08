export interface Country {
	name: string;
	countryCode: string;
}

interface PopulationDataPoint {
	year: number;
	value: number;
}

interface BorderCountry {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[] | null;
}

interface CountryBorderInfo {
	commonName: string;
	officialName: string;
	countryCode: string;
	region: string;
	borders: BorderCountry[];
}

export interface CountryDetails {
	borderCountries: CountryBorderInfo;
	populationData: PopulationDataPoint[];
	flagUrl: string;
}
