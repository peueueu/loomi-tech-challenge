"use client";

import { useState } from "react";
import { PlanCard } from "@/components/simulator/plan-card";
import { RangeSlider } from "@/components/simulator/range-slider";
import { AdditionalCoverage } from "@/components/simulator/additional-coverage";
import { BenefitsDisplay } from "@/components/simulator/benefits-display";
import { Indicators } from "@/components/simulator/indicators";

const PLANS = [
	{ id: "basic", name: "Básico", price: 89.9 },
	{ id: "intermediate", name: "Intermediário", price: 145.9 },
	{ id: "premium", name: "Premium", price: 225.9 },
];

const ADDITIONAL_COVERAGES = [
	{ id: "theft", name: "Cobertura contra roubo e furto", price: 25 },
	{ id: "collision", name: "Danos por colisão", price: 35 },
	{ id: "fire", name: "Cobertura contra incêndio", price: 20 },
	{ id: "natural", name: "Fenômenos naturais (granizo, enchente)", price: 30 },
];

const PLAN_BENEFITS = {
	basic: ["Tudo do básico"],
	intermediate: ["Tudo do básico", "Carro reserva", "Vidros"],
	premium: ["Tudo do básico", "Carro reserva", "Vidros"],
};

const PLAN_METRICS = [
	{ name: "Básico", price: 89.9, conversion: 75, roi: 90 },
	{ name: "Intermediário", price: 145.9, conversion: 48, roi: 114 },
	{ name: "Premium", price: 225.9, conversion: 23, roi: 70 },
];

export default function PlansSimulator() {
	const [activePlan, setActivePlan] = useState("intermediate");
	const [vehicleValue, setVehicleValue] = useState(50000);
	const [clientAge, setClientAge] = useState(28);
	const [selectedCoverages, setSelectedCoverages] = useState<{
		[key: string]: boolean;
	}>({
		theft: true,
		collision: true,
		fire: true,
		natural: false,
	});

	const toggleCoverage = (id: string) => {
		setSelectedCoverages((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const additionalCoveragesCost = ADDITIONAL_COVERAGES.reduce(
		(total, coverage) => {
			return selectedCoverages[coverage.id] ? total + coverage.price : total;
		},
		0,
	);

	const currentPlanBasePrice =
		PLANS.find((p) => p.id === activePlan)?.price || 89.9;
	const totalPlanPrice = currentPlanBasePrice + additionalCoveragesCost;

	const planMetricsWithCoverages = PLAN_METRICS.map((metric) => ({
		...metric,
		price: metric.price + additionalCoveragesCost,
	}));

	const selectedPlanBenefits =
		PLAN_BENEFITS[activePlan as keyof typeof PLAN_BENEFITS] || [];

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-5 lg:gap-6'>
			<div className='space-y-4 sm:space-y-5 lg:space-y-6'>
				<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 lg:p-6'>
					<h3 className='text-sm sm:text-base font-semibold text-slate-100 mb-3 sm:mb-4'>
						Planos personalizados
					</h3>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
						{PLANS.map((plan) => (
							<PlanCard
								key={plan.id}
								name={plan.name}
								price={
									plan.id === activePlan
										? totalPlanPrice
										: plan.price + additionalCoveragesCost
								}
								isRecommended={plan.id === "intermediate"}
								isActive={activePlan === plan.id}
								onClick={() => setActivePlan(plan.id)}
							/>
						))}
					</div>
				</div>

				<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 lg:p-6'>
					<RangeSlider
						label='Valor do veículo'
						min={10000}
						max={500000}
						value={vehicleValue}
						onChange={setVehicleValue}
						formatLabel={(v) => `R$ ${v.toLocaleString("pt-BR")}`}
					/>
				</div>

				<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 lg:p-6'>
					<RangeSlider
						label='Idade do Cliente'
						min={18}
						max={90}
						value={clientAge}
						onChange={setClientAge}
						unit=' anos'
					/>
				</div>

				<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 lg:p-6'>
					<h3 className='text-sm sm:text-base font-semibold text-slate-100 mb-3 sm:mb-4'>
						Coberturas Adicionais
					</h3>
					<div className='space-y-2'>
						{ADDITIONAL_COVERAGES.map((coverage) => (
							<AdditionalCoverage
								key={coverage.id}
								name={coverage.name}
								price={coverage.price}
								checked={selectedCoverages[coverage.id]}
								onChange={() => toggleCoverage(coverage.id)}
							/>
						))}
					</div>
				</div>
			</div>

			<div className='space-y-4 sm:space-y-5 lg:space-y-6'>
				<BenefitsDisplay benefits={selectedPlanBenefits} />
				<Indicators plans={planMetricsWithCoverages} />
			</div>
		</div>
	);
}
