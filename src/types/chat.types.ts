export interface ChatMessage {
	id: string;
	type: "user" | "assistant" | "suggestion";
	content: string;
	timestamp: string;
	userName?: string;
	showCheckmarks?: boolean;
	actions?: Array<{ id: string; label: string; onClick: () => void }>;
}
