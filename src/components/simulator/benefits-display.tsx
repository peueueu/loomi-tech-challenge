"use client";

import { BenefitsDisplayProps } from "@/types/simulator.types";

export function BenefitsDisplay({ benefits }: BenefitsDisplayProps) {
	return (
		<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-6'>
			<h3 className='text-base font-semibold text-slate-100 mb-4'>
				Benefícios Inclusos
			</h3>
			<div className='space-y-3'>
				{benefits.map((benefit, index) => (
					<div
						key={index}
						className='flex items-center gap-3'
					>
						<div className='w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0'>
							<div className='w-1.5 h-1.5 rounded-full bg-blue-400'></div>
						</div>
						<span className='text-sm text-slate-300'>{benefit}</span>
					</div>
				))}
			</div>
		</div>
	);
}
