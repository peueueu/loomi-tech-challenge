export type TicketStatus = "Aberto" | "Em andamento" | "Resolvido";
export type TicketPriority = "Urgente" | "Média" | "Baixa";

export interface Ticket {
	id: string;
	priority: TicketPriority;
	client: {
		name: string;
		email: string;
	};
	subject: string;
	status: TicketStatus;
	createdAt: string;
	responsible: string;
}

export interface TicketTableProps {
	tickets: Ticket[];
	onEdit?: (ticket: Ticket) => void;
	onView?: (ticket: Ticket) => void;
}
