const kpiEvolutionChartOptions = {
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
};

const kpiEvolutionChartSeries = {
	name: "R$",
	data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 95],
};

export { kpiEvolutionChartOptions, kpiEvolutionChartSeries };
