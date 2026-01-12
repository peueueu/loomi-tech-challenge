"use client";
import * as React from "react";
import { useEffect, useRef, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartSkeleton } from "../ui/chart-skeleton";

export function KPIEvolutionChart() {
	const [loading, setLoading] = React.useState(true);
	const chartOptions = useMemo(
		() => ({
			chart: {
				type: "area" as const,
				toolbar: { show: false },
				background: "transparent",
				sparkline: { enabled: false },
				height: 320,
			},
			colors: ["#45b9b6"],
			stroke: {
				curve: "smooth" as const,
				width: 2,
			},
			fill: {
				type: "gradient" as const,
				gradient: {
					shadeIntensity: 0.25,
					opacityFrom: 0.35,
					opacityTo: 0.85,
					stops: [20, 100, 100, 100],
				},
			},
			dataLabels: { enabled: false },
			grid: {
				borderColor: "rgba(71, 85, 105, 0.3)",
				xaxis: { lines: { show: false } },
				yaxis: { lines: { show: true } },
			},
			xaxis: {
				categories: [
					"Jan",
					"Fev",
					"Mar",
					"Abr",
					"Mai",
					"Jun",
					"Jul",
					"Ago",
					"Set",
					"Out",
					"Nov",
					"Dez",
				],
				labels: {
					style: { colors: "#94a3b8", fontSize: "12px" },
				},
				axisBorder: { show: false },
				axisTicks: { show: false },
			},
			yaxis: {
				labels: {
					style: { colors: "#94a3b8", fontSize: "12px" },
				},
			},
			tooltip: {
				theme: "dark" as const,
				style: { fontSize: "12px" },
				y: {
					formatter: (value: number) => `${value.toFixed(1)}k`,
				},
			},
		}),
		[],
	);

	const series = useMemo(
		() => [
			{
				name: "R$",
				data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 95],
			},
		],
		[],
	);

	const chartRef = useRef<HTMLDivElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const chartInstance = useRef<any>(null);

	useEffect(() => {
		if (!chartRef.current) return;

		let mounted = true;

		async function initChart() {
			const ApexCharts = (await import("apexcharts")).default;

			if (!mounted || !chartRef.current) return;

			const chart = new ApexCharts(chartRef.current, {
				...chartOptions,
				series,
			});

			chartInstance.current = chart;

			await chart.render().then(() => setLoading(false));
		}

		initChart().catch((e) => console.error(e));

		return () => {
			mounted = false;
			chartInstance.current?.destroy();
			chartInstance.current = null;
		};
	}, [chartOptions, series]);

	return (
		<Card className='bg-slate-900 border-slate-700 h-full flex flex-col'>
			<CardHeader>
				<CardTitle className='text-slate-100'>Evolução dos KPIs</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 min-h-0 px-6'>
				{loading && (
					<ChartSkeleton
						titleWidth='w-48'
						bars={12}
					/>
				)}
				<div
					ref={chartRef}
					className='w-full h-full'
				/>
			</CardContent>
		</Card>
	);
}
