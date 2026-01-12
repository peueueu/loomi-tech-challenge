import { NextRequest, NextResponse } from "next/server";
import { TicketsResponseSchema } from "@/schemas/ticket.schema";
import { TicketStatus } from "@/types/tickets.types";

export async function GET(request: NextRequest) {
	try {
		const authToken = request.cookies.get("access_token")?.value;

		if (!authToken) {
			return NextResponse.json(
				{ success: false, error: "Missing authentication token" },
				{ status: 401 },
			);
		}

		const response = await fetch(`${process.env.BACKEND_BASE_URL}/tickets`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`API responded with status ${response.status}`);
		}

		const json = await response.json();

		const parsed = TicketsResponseSchema.safeParse(json);

		if (!parsed.success) {
			console.error("Invalid tickets payload", parsed.error);
			console.log("error", JSON.stringify(parsed.error));
			return NextResponse.json(
				{
					success: false,
					error: "Invalid tickets response from backend",
				},
				{ status: 502 },
			);
		}

		const stats = parsed.data.data.reduce(
			(acc, ticket) => {
				acc[ticket.status] = (acc[ticket.status] ?? 0) + 1;
				return acc;
			},
			{
				Aberto: 0,
				"Em andamento": 0,
				Fechado: 0,
			} as Record<TicketStatus, number>,
		);

		return NextResponse.json({
			success: true,
			data: parsed.data.data,
			stats,
		});
	} catch (error) {
		console.error("Error fetching tickets:", error);

		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to fetch tickets",
			},
			{ status: 500 },
		);
	}
}
