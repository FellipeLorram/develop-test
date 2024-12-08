"use client";

import { use } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetCountryInfo } from "@/hooks/use-get-country-info";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
	params: Promise<{
		code: string;
	}>;
}

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "#2563eb",
	},
	mobile: {
		label: "Mobile",
		color: "#60a5fa",
	},
} satisfies ChartConfig;

export default function CountryPage({ params: paramsPromise }: PageProps) {
	const params = use(paramsPromise);
	const code = params.code;
	const { data: countryInfo } = useGetCountryInfo({ code });

	if (!countryInfo) return <Loading />;

	return (
		<div className="h-screen w-full p-4">
			<div className="mx-auto max-w-6xl w-11/12 space-y-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Countries</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href={`/country/${code}`}>
								{countryInfo.borderCountries.commonName}
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<Card>
					<CardHeader>
						<CardTitle>{countryInfo?.borderCountries.commonName}</CardTitle>
						<CardDescription>
							{countryInfo?.borderCountries.officialName}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-6">
						<div className="flex gap-4">
							<Image
								src={countryInfo?.flagUrl ?? ""}
								alt={countryInfo?.borderCountries.commonName ?? ""}
								width={100}
								height={100}
								className="rounded-md w-1/2 border"
							/>
							<div className="w-1/2">
								<h3 className="font-semibold mb-2">Border Countries</h3>
								<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
									{countryInfo?.borderCountries.borders.map((border) => (
										<Link
											key={border.countryCode}
											href={`/country/${border.countryCode.toLowerCase()}`}
										>
											<Badge
												variant="secondary"
												className="cursor-pointer hover:bg-secondary/80 w-full justify-center"
											>
												{border.commonName}
											</Badge>
										</Link>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Population Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[200px] w-full">
							<BarChart accessibilityLayer data={countryInfo.populationData}>
								<ChartTooltip content={<ChartTooltipContent />} />
								<CartesianGrid vertical={false} />
								<XAxis
									dataKey="year"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.toString()}
								/>
								<Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function Loading() {
	return (
		<div className="h-screen w-full p-4">
			<div className="mx-auto max-w-6xl w-11/12 space-y-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Countries</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>
								<Skeleton className="w-20 h-4" />
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<Card>
					<CardHeader>
						<CardTitle>
							<Skeleton className="w-1/2 h-4" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="w-1/2 h-4" />
						</CardDescription>
					</CardHeader>
					<CardContent className="flex gap-6">
						<Skeleton className="w-1/2 h-80 rounded-md" />
						<div className="w-1/2">
							<h3 className="font-semibold mb-2">Border Countries</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
								{Array.from({ length: 6 }).map((_, index) => (
									<Skeleton
										key={`skeleton-border-${index + 1}`}
										className="w-full h-4"
									/>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Population Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<Skeleton className="h-[200px] w-full" />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
