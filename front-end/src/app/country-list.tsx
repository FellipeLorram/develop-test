"use client";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Country } from "@/entities/country";
import { useListCountries } from "@/hooks/use-list-countries";
import Link from "next/link";
import { useQueryState } from "nuqs";

export function CountryList() {
	const [search] = useQueryState("search", { defaultValue: "" });
	const { data: countries, isPending } = useListCountries();

	if (isPending) return <CountryListSkeleton />;

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{countries
				?.filter((country) =>
					country.name.toLowerCase().includes(search.toLowerCase()),
				)
				.map((country) => (
					<CountryItem key={country.countryCode} country={country} />
				))}
		</div>
	);
}

function CountryListSkeleton() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-12" />
			<Skeleton className="h-12" />
			<Skeleton className="h-12" />
			<Skeleton className="h-12" />
			<Skeleton className="h-12" />
		</div>
	);
}

function CountryItem({ country }: { country: Country }) {
	return (
		<Link
			className={buttonVariants({
				variant: "outline",
			})}
			href={`/country/${country.countryCode}`}
		>
			{country.name}
		</Link>
	);
}
