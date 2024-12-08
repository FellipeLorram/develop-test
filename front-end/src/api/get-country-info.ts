import type { CountryDetails } from "@/entities/country";
import { api } from "./api";

interface Request {
	code: string;
}

export async function getCountryInfo({
	code,
}: Request): Promise<CountryDetails> {
	const response = await api.get<CountryDetails>(`/countries/${code}`);
	return response.data;
}
