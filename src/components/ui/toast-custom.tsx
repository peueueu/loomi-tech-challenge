"use client";

import { X, CheckCircle } from "lucide-react";

interface CustomToastProps {
	title: string;
	description?: string;
	onClose?: () => void;
}

export function SuccessToast({
	title,
	description,
	onClose,
}: CustomToastProps) {
	return (
		<div className='flex items-center gap-3 bg-blue-500 text-white rounded-lg px-6 py-4 shadow-lg max-w-md'>
			<CheckCircle
				className='w-5 h-5 shrink-0'
				strokeWidth={1.5}
			/>
			<div className='flex-1'>
				<p className='font-semibold text-base'>{title}</p>
				{description && (
					<p className='text-sm text-blue-100 mt-0.5'>{description}</p>
				)}
			</div>
			{onClose && (
				<button
					onClick={onClose}
					className='shrink-0 text-blue-100 hover:text-white transition-colors'
				>
					<X className='w-5 h-5' />
				</button>
			)}
		</div>
	);
}
