import { Ticket } from "@/schemas/ticket.schema";
import { LucideIcon } from "lucide-react";

type TicketStatus = "Aberto" | "Em andamento" | "Fechado";
type TicketPriority = "Urgente" | "Média" | "Baixa";
interface TicketTableProps {
	tickets: Ticket[];
	loading?: boolean;
	onEdit?: (ticket: Ticket) => void;
	onView?: (ticket: Ticket) => void;
}

interface TicketFormProps {
	ticket?: Ticket;
	isEditing?: boolean;
	onSubmit: (data: Partial<Ticket>) => void;
	onCancel: () => void;
}

interface StatsCardProps {
	label: string;
	value: string | number;
	icon: LucideIcon;
	color?: "blue" | "orange" | "green" | "cyan";
}

interface FilterSelectProps {
	label: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export type {
	TicketStatus,
	TicketPriority,
	Ticket,
	TicketTableProps,
	TicketFormProps,
	StatsCardProps,
	FilterSelectProps,
	PaginationProps,
};
