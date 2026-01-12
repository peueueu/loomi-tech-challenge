"use client";

import { KPIEvolutionChart } from "@/components/dashboard/charts/kpi-evolution-chart";
import { ConversionRateChart } from "@/components/dashboard/charts/conversion-rate-chart";
import { DashboardMap } from "@/components/dashboard/map";

export default function Dashboard() {
	return (
		<div className='flex flex-col gap-4 sm:gap-5 lg:gap-6'>
			<div className='bg-slate-800 rounded-lg p-4 sm:p-5 lg:p-6 border border-slate-700'>
				<h2 className='text-lg sm:text-xl lg:text-xl font-semibold text-slate-100 mb-2 sm:mb-3 lg:mb-4'>
					Bem-vindo ao Dashboard
				</h2>
				<p className='text-sm sm:text-base text-slate-400'>
					Selecione uma opção na sidebar para começar
				</p>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4 sm:gap-5 lg:gap-6 lg:max-h-96'>
				<div className='lg:max-h-96 overflow-hidden'>
					<KPIEvolutionChart />
				</div>
				<div className='lg:max-h-96 overflow-hidden'>
					<ConversionRateChart />
				</div>
			</div>
			<DashboardMap />
		</div>
	);
}
