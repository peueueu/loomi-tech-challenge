"use client";

import { StatsCardProps } from "@/types/tickets.types";

const colorMap = {
	blue: "text-blue-400",
	orange: "text-orange-400",
	green: "text-green-400",
	cyan: "text-cyan-400",
};

export function StatsCard({
	label,
	value,
	icon: Icon,
	color = "blue",
}: StatsCardProps) {
	return (
		<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between'>
			<div>
				<p className='text-sm text-slate-400 mb-1'>{label}</p>
				<p className='text-3xl font-bold text-white'>{value}</p>
			</div>
			<Icon
				className={`w-8 h-8 ${colorMap[color]}`}
				strokeWidth={1.5}
			/>
		</div>
	);
}
