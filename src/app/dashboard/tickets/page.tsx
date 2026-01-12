"use client";

import { useEffect, useState } from "react";
import { Plus, AlertCircle, Clock, CheckCircle, Timer } from "lucide-react";
import { toast } from "sonner";
import { StatsCard } from "@/components/tickets/stats-card";
import { SearchInput, FilterSelect } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/table/ticket-table";
import { TicketForm } from "@/components/tickets/ticket-form";
import { Pagination } from "@/components/tickets/pagination";
import { Modal } from "@/components/ui/modal";
import { SuccessToast } from "@/components/ui/toast-custom";
import { Ticket, TicketStats } from "@/schemas/ticket.schema";
import { computeTicketStats } from "@/lib/compute-ticket-stats";

async function fetchTickets(): Promise<{
	tickets: Ticket[];
	stats: TicketStats;
}> {
	const response = await fetch("/api/tickets");

	if (!response.ok) {
		throw new Error("Failed to fetch tickets");
	}

	const json = await response.json();
	const stats = computeTicketStats(json.data);
	return { tickets: json.data, stats };
}

export default function Tickets() {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [priorityFilter, setPriorityFilter] = useState("");
	const [responsibleFilter, setResponsibleFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [stats, setStats] = useState<TicketStats | undefined>();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		fetchTickets()
			.then(({ tickets, stats }) => {
				if (isMounted) {
					setTickets(tickets);
					setStats(stats);
				}
			})
			.catch(() => {
				toast.error("Falha ao carregar os tickets.");
			})
			.finally(() => {
				if (isMounted) {
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCurrentPage(1);
	}, [searchQuery, statusFilter, priorityFilter, responsibleFilter]);

	const openNewTicketModal = () => {
		setSelectedTicket(undefined);
		setIsModalOpen(true);
	};

	const openEditTicketModal = (ticket: Ticket) => {
		setSelectedTicket(ticket);
		setIsEditing(true);
		setIsModalOpen(true);
	};

	const openViewTicketModal = (ticket: Ticket) => {
		setSelectedTicket(ticket);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedTicket(undefined);
		setIsEditing(false);
	};

	const handleSubmitForm = (data: Partial<Ticket>) => {
		if (selectedTicket) {
			setTickets(
				tickets.map((t) =>
					t.id === selectedTicket.id ? { ...t, ...data } : t,
				),
			);
			toast.custom((t) => (
				<SuccessToast
					title='Ticket atualizado com sucesso!'
					description='As alterações foram salvas.'
					onClose={() => toast.dismiss(t)}
				/>
			));
		} else {
			const newTicket: Ticket = {
				id: crypto.randomUUID(),
				ticketId: `TK${(
					Math.max(...tickets.map((t) => parseInt(t.id.slice(2)))) + 1
				)
					.toString()
					.padStart(3, "0")}`,
				priority: data.priority || "Média",
				client: data?.client ?? "",
				email: data?.email ?? "",
				subject: data.subject || "",
				status: "Aberto",
				createdAt: new Date().toLocaleDateString("pt-BR"),
				updatedAt: new Date().toLocaleDateString("pt-BR"),
				responsible: data.responsible || "",
			};
			setTickets([newTicket, ...tickets]);
			toast.custom((t) => (
				<SuccessToast
					title='Ticket criado com sucesso!'
					description='O ticket foi criado e já está na sua lista.'
					onClose={() => toast.dismiss(t)}
				/>
			));
		}
		handleCloseModal();
	};

	const filteredTickets = tickets.filter((ticket) => {
		const matchesSearch =
			ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ticket.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus = !statusFilter || ticket.status === statusFilter;
		const matchesPriority =
			!priorityFilter || ticket.priority === priorityFilter;
		const matchesResponsible =
			!responsibleFilter || ticket.responsible === responsibleFilter;

		return (
			matchesSearch && matchesStatus && matchesPriority && matchesResponsible
		);
	});

	const itemsPerPage = 5;
	const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
	const paginatedTickets = filteredTickets.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<div className='space-y-4 sm:space-y-5 lg:space-y-6'>
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0'>
				<h1 className='text-xl sm:text-2xl font-bold text-slate-100'>
					Gestão de Tickets
				</h1>
				<button
					onClick={openNewTicketModal}
					className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors w-full sm:w-auto justify-center sm:justify-start'
				>
					<Plus className='w-5 h-5' />
					Novo Ticket
				</button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6'>
				<StatsCard
					label='Tickets Abertos'
					value={stats?.Aberto ?? 0}
					icon={AlertCircle}
					color='cyan'
				/>
				<StatsCard
					label='Em andamento'
					value={stats?.["Em andamento"] ?? 0}
					icon={Clock}
					color='orange'
				/>
				<StatsCard
					label='Resolvidos hoje'
					value={stats?.Fechado ?? 0}
					icon={CheckCircle}
					color='green'
				/>
				<StatsCard
					label='Tempo Médio'
					value='2.5h'
					icon={Timer}
					color='blue'
				/>
			</div>

			<div className='bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-5 lg:p-6'>
				<h3 className='text-base sm:text-lg font-semibold text-slate-100 mb-4 sm:mb-5 lg:mb-6'>
					Lista de Tickets
				</h3>

				<div className='flex flex-col lg:flex-row gap-3 mb-4 sm:mb-5 lg:mb-6'>
					<div className='flex-1'>
						<SearchInput
							placeholder='Buscar por ID, cliente ou assunto...'
							value={searchQuery}
							onChange={setSearchQuery}
						/>
					</div>
					<div className='flex flex-col sm:flex-row gap-3 lg:gap-3'>
						<FilterSelect
							label='Todos os status'
							options={["Aberto", "Em andamento", "Resolvido"]}
							value={statusFilter}
							onChange={setStatusFilter}
						/>
						<FilterSelect
							label='Todas as prioridades'
							options={["Urgente", "Média", "Baixa"]}
							value={priorityFilter}
							onChange={setPriorityFilter}
						/>
						<FilterSelect
							label='Todos os responsáveis'
							options={[
								"Ana Silva",
								"João Costa",
								"Carlos Lima",
								"Anderson Freitas",
							]}
							value={responsibleFilter}
							onChange={setResponsibleFilter}
						/>
					</div>
				</div>

				<TicketTable
					tickets={paginatedTickets}
					loading={isLoading}
					onEdit={openEditTicketModal}
					onView={openViewTicketModal}
				/>

				{!isLoading && (
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				)}
			</div>

			<Modal
				isOpen={isModalOpen}
				title={
					selectedTicket && isEditing
						? "Editar Ticket"
						: selectedTicket
						? `${selectedTicket.client} - ${selectedTicket?.id}`
						: "Novo Ticket"
				}
				description={
					selectedTicket && isEditing
						? "Edite as informações do ticket abaixo."
						: selectedTicket
						? "Visualize as informações do ticket abaixo."
						: "Preencha as informações do novo ticket abaixo."
				}
				onClose={handleCloseModal}
			>
				<TicketForm
					key={selectedTicket?.id || "new"}
					ticket={selectedTicket}
					isEditing={isEditing}
					onSubmit={handleSubmitForm}
					onCancel={handleCloseModal}
				/>
			</Modal>
		</div>
	);
}
