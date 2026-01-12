"use client";

import { IndicatorsProps } from "@/types/simulator.types";

export function Indicators({ plans }: IndicatorsProps) {
	return (
		<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-6'>
			<h3 className='text-base font-semibold text-slate-100 mb-4'>
				Indicadores
			</h3>
			<div className='space-y-3'>
				{plans.map((plan, index) => (
					<div
						key={index}
						className='p-4 bg-slate-700/30 rounded-lg border border-slate-600/50'
					>
						<div className='flex items-start justify-between mb-2'>
							<h4 className='text-sm font-semibold text-slate-100'>
								{plan.name}
							</h4>
							<span className='text-base font-bold text-white'>
								R$ {plan.price.toFixed(2)}
							</span>
						</div>
						<div className='flex gap-4 text-xs'>
							<div className='text-slate-400'>
								Conversão:{" "}
								<span className='text-green-400 font-semibold'>
									{plan.conversion}%
								</span>
							</div>
							<div className='text-slate-400'>
								ROI:{" "}
								<span className='text-green-400 font-semibold'>
									{plan.roi}%
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
