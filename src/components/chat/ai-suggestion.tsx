"use client";

import { Lightbulb } from "lucide-react";

interface SuggestionAction {
	id: string;
	label: string;
	onClick: () => void;
}

interface AISuggestionProps {
	content: string;
	timestamp: string;
	actions: SuggestionAction[];
}

export function AISuggestion({
	content,
	timestamp,
	actions,
}: AISuggestionProps) {
	return (
		<div className='flex justify-end mb-4'>
			<div className='max-w-md'>
				<div className='bg-slate-700 text-slate-100 rounded-3xl rounded-tr-none px-4 py-3'>
					<div className='flex items-start gap-2 mb-2'>
						<Lightbulb className='w-4 h-4 text-slate-400 shrink-0 mt-0.5' />
						<p className='text-xs font-semibold text-slate-400'>
							Sugestão da IA
						</p>
					</div>
					<p className='text-sm text-slate-100'>{content}</p>
					<div className='flex justify-end mt-2'>
						<span className='text-xs opacity-70'>{timestamp}</span>
					</div>
				</div>

				<div className='flex gap-2 mt-3 justify-end'>
					{actions.map((action) => (
						<button
							key={action.id}
							onClick={action.onClick}
							className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-colors'
						>
							{action.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
