"use client";

import { AdditionalCoverageProps } from "@/types/simulator.types";

export function AdditionalCoverage({
	name,
	price,
	checked,
	onChange,
}: AdditionalCoverageProps) {
	return (
		<label className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors'>
			<input
				type='checkbox'
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
				className='w-4 h-4 rounded border-slate-600 accent-blue-500 cursor-pointer'
			/>
			<span className='text-sm text-slate-300 flex-1'>{name}</span>
			<span className='text-sm font-semibold text-blue-400'>
				+ R$ {price.toFixed(2)}
			</span>
		</label>
	);
}
