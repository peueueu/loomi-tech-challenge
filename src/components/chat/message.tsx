"use client";

import { Check } from "lucide-react";

export type MessageType = "user" | "assistant" | "suggestion";

interface MessageProps {
	type: MessageType;
	content: string;
	timestamp: string;
	userName?: string;
	showCheckmarks?: boolean;
}

export function Message({
	type,
	content,
	timestamp,
	userName = "Ricardo Leite - Seguro Automóvel",
	showCheckmarks = false,
}: MessageProps) {
	if (type === "user") {
		return (
			<div className='flex justify-start mb-4'>
				<div className='bg-blue-500 text-white rounded-3xl rounded-bl-none px-4 py-3 max-w-xs'>
					<p className='text-sm'>{content}</p>
					<div className='flex items-center justify-end gap-1 mt-2'>
						<span className='text-xs opacity-80'>{timestamp}</span>
						{showCheckmarks && (
							<div className='flex gap-0.5'>
								<Check
									className='w-3 h-3'
									strokeWidth={3}
								/>
								<Check
									className='w-3 h-3 -ml-1.5'
									strokeWidth={3}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}

	if (type === "assistant") {
		return (
			<div className='flex justify-end mb-4'>
				<div className='bg-slate-700 text-slate-100 rounded-3xl rounded-tr-none px-4 py-3 max-w-md'>
					<p className='text-xs font-semibold text-slate-400 mb-1'>
						Assistente
					</p>
					<p className='text-sm'>{content}</p>
					<div className='flex justify-end mt-2'>
						<span className='text-xs opacity-70'>{timestamp}</span>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
