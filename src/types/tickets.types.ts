type TicketStatus = "Aberto" | "Em andamento" | "Resolvido";
type TicketPriority = "Urgente" | "Média" | "Baixa";

interface Ticket {
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

interface TicketTableProps {
	tickets: Ticket[];
	onEdit?: (ticket: Ticket) => void;
	onView?: (ticket: Ticket) => void;
}

interface TicketFormProps {
	ticket?: Ticket;
	onSubmit: (data: Partial<Ticket>) => void;
	onCancel: () => void;
}

export type {
	TicketStatus,
	TicketPriority,
	Ticket,
	TicketTableProps,
	TicketFormProps,
};
