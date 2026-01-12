const conversionRateChartOptions = {
	chart: {
		type: "bar" as const,
		toolbar: { show: false },
		background: "transparent",
		sparkline: { enabled: false },
		height: 320,
	},
	colors: ["#06b6d4"],
	plotOptions: {
		bar: {
			columnWidth: "60%",
			borderRadius: 4,
			dataLabels: {
				position: "top" as const,
			},
		},
	},
	dataLabels: { enabled: false },
	grid: {
		borderColor: "rgba(71, 85, 105, 0.3)",
		xaxis: { lines: { show: false } },
		yaxis: { lines: { show: true } },
	},
	xaxis: {
		categories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
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
			formatter: (value: number) => `${value} novos clientes`,
		},
	},
};

const conversionRateChartSeries = {
	name: "",
	data: [100, 73, 110, 32, 52, 76],
};

export { conversionRateChartOptions, conversionRateChartSeries };
