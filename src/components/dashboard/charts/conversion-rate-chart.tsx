"use client";
import * as React from "react";
import { useEffect, useRef, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartSkeleton } from "@/components/ui/chart-skeleton";
import {
	conversionRateChartOptions,
	conversionRateChartSeries,
} from "./conversion-rate-chart.config";

export function ConversionRateChart() {
	const [loading, setLoading] = React.useState(true);

	const chartOptions = useMemo(() => ({ ...conversionRateChartOptions }), []);

	const series = useMemo(() => [{ ...conversionRateChartSeries }], []);

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

			await chart.render();

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
				<CardTitle className='text-slate-100'>Taxa de conversão</CardTitle>
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
