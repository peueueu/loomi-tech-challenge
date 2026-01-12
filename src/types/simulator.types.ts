export interface IndicatorMetrics {
	name: string;
	price: number;
	conversion: number;
	roi: number;
}

export interface IndicatorsProps {
	plans: IndicatorMetrics[];
}
