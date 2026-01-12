import { z } from "zod";

export const TicketStatusSchema = z.enum(["Aberto", "Em andamento", "Fechado"]);
export type TicketStatus = z.infer<typeof TicketStatusSchema>;

export const TicketSchema = z.object({
	id: z.uuid(),
	ticketId: z.string(),
	priority: z.enum(["Urgente", "Média", "Baixa"]),
	client: z.string(),
	email: z.email(),
	subject: z.string(),
	status: TicketStatusSchema,
	responsible: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const TicketsResponseSchema = z.object({
	data: z.array(TicketSchema),
	total: z.number(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export const TicketsStatsSchema = z.object({
	Aberto: z.number(),
	"Em andamento": z.number(),
	Fechado: z.number(),
});

export type TicketStats = z.infer<typeof TicketsStatsSchema>;
