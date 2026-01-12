"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
	isOpen: boolean;
	title: string;
	description?: string;
	onClose: () => void;
	children: React.ReactNode;
}

export function Modal({
	isOpen,
	title,
	description,
	onClose,
	children,
}: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/60 backdrop-blur-sm'
				onClick={onClose}
			/>

			<div className='relative bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-w-2xl w-full mx-4'>
				<div className='flex items-center justify-between p-6 border-b border-slate-700'>
					<div className='flex-1'>
						<h2 className='text-xl font-semibold text-slate-100'>{title}</h2>
						{description && (
							<p className='text-sm text-slate-400 mt-1'>{description}</p>
						)}
					</div>
					<button
						onClick={onClose}
						className='flex items-center justify-center w-8 h-8 rounded-full border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-colors'
					>
						<X className='w-5 h-5' />
					</button>
				</div>

				<div className='p-6'>{children}</div>
			</div>
		</div>
	);
}
