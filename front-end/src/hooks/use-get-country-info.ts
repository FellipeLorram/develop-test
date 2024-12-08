import { useQuery } from "@tanstack/react-query";
import { getCountryInfo } from "@/api/get-country-info";

interface Props {
	code: string;
}

export function useGetCountryInfo({ code }: Props) {
	return useQuery({
		queryKey: ["country", code],
		queryFn: () => getCountryInfo({ code }),
	});
}
