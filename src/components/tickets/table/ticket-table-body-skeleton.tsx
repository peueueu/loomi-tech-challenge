"use client";

export function TicketTableBodySkeleton({ rows = 5 }: { rows?: number }) {
	return (
		<tbody>
			{Array.from({ length: rows }).map((_, index) => (
				<tr
					key={index}
					className='border-b border-slate-700'
				>
					<td className='px-4 py-4'>
						<div className='h-4 w-16 bg-slate-700 rounded skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-6 w-20 bg-slate-700 rounded-full skeleton-shimmer' />
					</td>

					<td className='px-4 py-4 space-y-2'>
						<div className='h-4 w-32 bg-slate-700 rounded skeleton-shimmer' />
						<div className='h-3 w-40 bg-slate-800 rounded skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-4 w-48 bg-slate-700 rounded skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-6 w-24 bg-slate-700 rounded-full skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-4 w-24 bg-slate-700 rounded skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-4 w-32 bg-slate-700 rounded skeleton-shimmer' />
					</td>

					<td className='px-4 py-4'>
						<div className='h-4 w-16 bg-slate-700 rounded skeleton-shimmer' />
					</td>
				</tr>
			))}
		</tbody>
	);
}
