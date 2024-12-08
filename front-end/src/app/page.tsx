import { ScrollArea } from "@/components/ui/scroll-area";
import { CountryList } from "./country-list";
import { CountrySearchInput } from "./country-search-input";

export default function Home() {
	return (
		<div className="h-screen w-full overflow-hidden">
			<div className="w-11/12 max-w-6xl p-4 pb-0 mx-auto space-y-4 h-screen flex flex-col">
				<CountrySearchInput />
				<ScrollArea className="flex-1">
					<CountryList />
					<div className="h-4" />
				</ScrollArea>
			</div>
		</div>
	);
}
