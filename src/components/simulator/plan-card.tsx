"use client";

import { PlanCardProps } from "@/types/simulator.types";

export function PlanCard({
	name,
	price,
	isRecommended = false,
	isActive = false,
	onClick,
}: PlanCardProps) {
	return (
		<button
			onClick={onClick}
			className={`relative p-4 rounded-lg border transition-all duration-200 ${
				isActive
					? "border-blue-500 bg-slate-700/50"
					: "border-slate-600 bg-slate-800/50 hover:border-slate-500"
			}`}
		>
			<div className='flex flex-col items-start gap-2'>
				<h3 className='text-sm font-semibold text-slate-100'>{name}</h3>
				{isRecommended && (
					<span className='px-2 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-400 rounded'>
						Recomendado
					</span>
				)}
			</div>
			<div className='mt-4'>
				<p className='text-2xl font-bold text-white'>R$ {price.toFixed(2)}</p>
				<p className='text-xs text-slate-400 mt-1'>Por mês</p>
			</div>
		</button>
	);
}
