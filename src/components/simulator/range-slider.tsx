"use client";

import { RangeSliderProps } from "@/types/simulator.types";

export function RangeSlider({
	label,
	min,
	max,
	value,
	onChange,
	unit = "",
	formatLabel,
}: RangeSliderProps) {
	const displayValue = formatLabel ? formatLabel(value) : `${value}${unit}`;

	return (
		<div className='space-y-3'>
			<div className='flex justify-between items-center'>
				<label className='text-sm font-medium text-slate-100'>{label}</label>
				<span className='text-lg font-semibold text-white'>{displayValue}</span>
			</div>
			<input
				type='range'
				min={min}
				max={max}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className='w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500'
				style={{
					background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
						((value - min) / (max - min)) * 100
					}%, #475569 ${((value - min) / (max - min)) * 100}%, #475569 100%)`,
				}}
			/>
			<div className='flex justify-between text-xs text-slate-400'>
				<span>{min.toLocaleString()}</span>
				<span>{max.toLocaleString()}</span>
			</div>
		</div>
	);
}
