import { TicketPriority, TicketStatus } from "@/types/tickets.types";

export const priorityColors: Record<TicketPriority, string> = {
	Urgente: "bg-red-500/20 text-red-400 border border-red-500/30",
	Média: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
	Baixa: "bg-slate-700 text-slate-300 border border-slate-600",
};

export const statusColors: Record<TicketStatus, string> = {
	Aberto: "bg-green-500/20 text-green-400 border border-green-500/30",
	"Em andamento":
		"bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
	Fechado: "bg-slate-700 text-slate-300 border border-slate-600",
};
