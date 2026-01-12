"use client";

import React from "react";
import { Edit2, ChevronRight } from "lucide-react";
import { TicketTableProps } from "@/types/tickets.types";
import { priorityColors, statusColors } from "./ticket-table.config";

export function TicketTable({ tickets, onEdit, onView }: TicketTableProps) {
	return (
		<div className='overflow-x-auto'>
			<table className='w-full'>
				<thead>
					<tr className='border-b border-slate-700'>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							ID
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Prioridade
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Cliente
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Assunto
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Status
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Criado em
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Responsável
						</th>
						<th className='text-left px-4 py-3 text-sm font-semibold text-slate-300'>
							Ações
						</th>
					</tr>
				</thead>
				<tbody>
					{tickets.map((ticket) => (
						<tr
							key={ticket.id}
							className='border-b border-slate-700 hover:bg-slate-700/30 transition-colors'
						>
							<td className='px-4 py-4 text-sm font-semibold text-slate-100'>
								{ticket.id}
							</td>
							<td className='px-4 py-4 text-sm'>
								<span
									className={`px-3 py-1 rounded-full text-xs font-semibold ${
										priorityColors[ticket.priority]
									}`}
								>
									{ticket.priority}
								</span>
							</td>
							<td className='px-4 py-4 text-sm'>
								<div>
									<p className='text-slate-100 font-medium'>
										{ticket.client.name}
									</p>
									<p className='text-slate-500 text-xs'>
										{ticket.client.email}
									</p>
								</div>
							</td>
							<td className='px-4 py-4 text-sm text-slate-300'>
								{ticket.subject}
							</td>
							<td className='px-4 py-4 text-sm'>
								<span
									className={`px-3 py-1 rounded-full text-xs font-semibold ${
										statusColors[ticket.status]
									}`}
								>
									{ticket.status}
								</span>
							</td>
							<td className='px-4 py-4 text-sm text-slate-400'>
								{ticket.createdAt}
							</td>
							<td className='px-4 py-4 text-sm text-slate-300'>
								{ticket.responsible}
							</td>
							<td className='px-4 py-4 text-sm'>
								<div className='flex items-center gap-2'>
									<button
										onClick={() => onEdit?.(ticket)}
										className='flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors'
									>
										<Edit2 className='w-4 h-4' />
										<span className='text-xs'>Editar</span>
									</button>
									<button
										onClick={() => onView?.(ticket)}
										className='flex items-center gap-1 text-slate-400 hover:text-slate-300 transition-colors'
									>
										<span className='text-xs'>Ver</span>
										<ChevronRight className='w-3 h-3' />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
