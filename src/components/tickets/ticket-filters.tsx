"use client";

import { FilterSelectProps } from "@/types/tickets.types";
import { Search, ChevronDown } from "lucide-react";

export function FilterSelect({
	label,
	options,
	value,
	onChange,
}: FilterSelectProps) {
	return (
		<div className='relative'>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 cursor-pointer hover:border-slate-600 focus:outline-none focus:border-blue-500 pr-8'
			>
				<option value=''>{label}</option>
				{options.map((option) => (
					<option
						key={option}
						value={option}
					>
						{option}
					</option>
				))}
			</select>
			<ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none' />
		</div>
	);
}

export function SearchInput({
	placeholder = "Buscar...",
	value,
	onChange,
}: {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className='relative flex-1'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
			<input
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pl-10 text-sm text-slate-300 placeholder-slate-500 hover:border-slate-600 focus:outline-none focus:border-blue-500'
			/>
		</div>
	);
}
