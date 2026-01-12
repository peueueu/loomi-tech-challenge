"use client";

import { PaginationProps } from "@/types/tickets.types";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	return (
		<div className='flex items-center justify-center gap-2 mt-6'>
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className='p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
			>
				<ChevronsLeft className='w-4 h-4 text-slate-400' />
			</button>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
			>
				<ChevronLeft className='w-4 h-4 text-slate-400' />
			</button>

			<span className='px-4 py-2 text-sm text-slate-400'>
				{currentPage} de {totalPages}
			</span>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
			>
				<ChevronRight className='w-4 h-4 text-slate-400' />
			</button>
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className='p-2 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors'
			>
				<ChevronsRight className='w-4 h-4 text-slate-400' />
			</button>
		</div>
	);
}
