"use client";

import { Send } from "lucide-react";

interface ChatInputProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	disabled?: boolean;
}

export function ChatInput({
	value,
	onChange,
	onSend,
	disabled = false,
}: ChatInputProps) {
	const handleKeyUp = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<div className='flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3'>
			<input
				type='text'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyUp={handleKeyUp}
				placeholder='Escreva aqui...'
				disabled={disabled}
				className='flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none disabled:opacity-50'
			/>
			<button
				onClick={onSend}
				disabled={disabled || !value.trim()}
				className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white transition-colors'
			>
				<Send
					className='w-5 h-5'
					strokeWidth={2}
				/>
			</button>
		</div>
	);
}
