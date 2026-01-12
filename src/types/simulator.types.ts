export interface IndicatorMetrics {
	name: string;
	price: number;
	conversion: number;
	roi: number;
}

export interface IndicatorsProps {
	plans: IndicatorMetrics[];
}

export interface PlanCardProps {
	name: string;
	price: number;
	isRecommended?: boolean;
	isActive?: boolean;
	onClick?: () => void;
}

export interface RangeSliderProps {
	label: string;
	min: number;
	max: number;
	value: number;
	onChange: (value: number) => void;
	unit?: string;
	formatLabel?: (value: number) => string;
}
