"use client";

import React, { useState } from "react";
import type { TicketFormProps } from "@/types/tickets.types";

export function TicketForm({ ticket, onSubmit, onCancel }: TicketFormProps) {
	const [formData, setFormData] = useState({
		clientName: ticket?.client.name || "",
		clientEmail: ticket?.client.email || "",
		priority: ticket?.priority || "",
		responsible: ticket?.responsible || "",
		subject: ticket?.subject || "",
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			client: {
				name: formData.clientName,
				email: formData.clientEmail,
			},
			priority: formData.priority as "Urgente" | "Média" | "Baixa",
			responsible: formData.responsible,
			subject: formData.subject,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='space-y-4'
		>
			<div>
				<label className='block text-sm font-medium text-slate-100 mb-2'>
					Nome do cliente
				</label>
				<input
					type='text'
					name='clientName'
					value={formData.clientName}
					onChange={handleChange}
					placeholder='Nome da pessoa ou empresa que está solicitando o suporte'
					className='w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-slate-100 mb-2'>
					Email
				</label>
				<input
					type='email'
					name='clientEmail'
					value={formData.clientEmail}
					onChange={handleChange}
					placeholder='E-mail de contato para atualizações e resposta'
					className='w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-slate-100 mb-2'>
					Prioridade
				</label>
				<select
					name='priority'
					value={formData.priority}
					onChange={handleChange}
					className='w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer'
					required
				>
					<option value=''>Selecione o nível de urgência do atendimento</option>
					<option value='Baixa'>Baixa</option>
					<option value='Média'>Média</option>
					<option value='Urgente'>Urgente</option>
				</select>
			</div>

			<div>
				<label className='block text-sm font-medium text-slate-100 mb-2'>
					Responsável
				</label>
				<input
					type='text'
					name='responsible'
					value={formData.responsible}
					onChange={handleChange}
					placeholder='Quem será o responsável por esse ticket'
					className='w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors'
					required
				/>
			</div>

			<div>
				<label className='block text-sm font-medium text-slate-100 mb-2'>
					Assunto
				</label>
				<textarea
					name='subject'
					value={formData.subject}
					onChange={handleChange}
					placeholder='Resumo breve do problema ou solicitação'
					rows={4}
					className='w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none'
					required
				/>
			</div>

			<div className='flex gap-3 pt-4'>
				<button
					type='button'
					onClick={onCancel}
					className='flex-1 px-4 py-2 border border-slate-500 rounded-lg text-slate-300 font-semibold hover:bg-slate-700 hover:text-slate-100 transition-colors'
				>
					Cancelar
				</button>
				<button
					type='submit'
					className='flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors'
				>
					Salvar
				</button>
			</div>
		</form>
	);
}
