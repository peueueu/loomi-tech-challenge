import { Ticket, TicketStats } from "@/schemas/ticket.schema";

export function computeTicketStats(tickets: Ticket[]): TicketStats {
	return tickets.reduce<TicketStats>(
		(acc, ticket) => {
			acc[ticket.status]++;
			return acc;
		},
		{
			Aberto: 0,
			"Em andamento": 0,
			Fechado: 0,
		},
	);
}
