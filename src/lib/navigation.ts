import { BarChart3, MessageCircle, Ticket, Zap } from "lucide-react";

export const navigationItems = [
	{
		id: "dashboard",
		label: "Dashboard",
		href: "/dashboard",
		icon: BarChart3,
	},
	{
		id: "chat",
		label: "Chat",
		href: "/dashboard/chat",
		icon: MessageCircle,
	},
	{
		id: "tickets",
		label: "Gestão de Tickets",
		href: "/dashboard/tickets",
		icon: Ticket,
	},
	{
		id: "simulator",
		label: "Simulador de Planos",
		href: "/dashboard/simulador-de-planos",
		icon: Zap,
	},
];
