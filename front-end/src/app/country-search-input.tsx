"use client";

import { useQueryState } from "nuqs";

export function CountrySearchInput() {
	const [search, setSearch] = useQueryState("search", { defaultValue: "" });

	return (
		<input
			className="w-full p-2 rounded-md rounded-b-none h-12 text-lg border-b focus:outline-none focus:ring-0"
			type="text"
			placeholder="Search"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
	);
}
