import { api } from "./api"
import type { Country } from "@/entities/country"

export async function listCountries(): Promise<Country[]> {
  const response = await api.get<Country[]>('/countries')
  return response.data
}
