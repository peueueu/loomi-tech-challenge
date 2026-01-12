"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/components/chat/message";
import { AISuggestion } from "@/components/chat/ai-suggestion";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessage } from "@/types/chat.types";

const INITIAL_MESSAGES: ChatMessage[] = [
	{
		id: "1",
		type: "user",
		content: "Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel",
		timestamp: "12:23",
		userName: "Ricardo Leite - Seguro Automóvel",
		showCheckmarks: true,
	},
	{
		id: "2",
		type: "assistant",
		content:
			"Oi, Ricardo! Tudo ótimo com você? Claro que sim, posso te ajudar com o que precisar. Vi aqui que você com a gente há 6 meses com o seguro de automóvel, e isso mesmo?",
		timestamp: "12:23",
	},
	{
		id: "3",
		type: "user",
		content:
			"Isso! Mas agora fiquei pensando... tem alguma coisa além disso? Tipo, prós meus equipamentos",
		timestamp: "12:23",
	},
	{
		id: "4",
		type: "suggestion",
		content:
			"Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.",
		timestamp: "12:23",
		actions: [
			{
				id: "send-proposal",
				label: "Enviar proposta",
				onClick: () => alert("Proposta enviada!"),
			},
			{
				id: "make-call",
				label: "Fazer ligação",
				onClick: () => alert("Iniciando ligação..."),
			},
			{
				id: "view-history",
				label: "Ver histórico",
				onClick: () => alert("Abrindo histórico..."),
			},
		],
	},
];

export default function Chat() {
	const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
	const [inputValue, setInputValue] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSendMessage = () => {
		if (!inputValue.trim()) return;

		const assistantMessage: ChatMessage = {
			id: Date.now().toString(),
			type: "assistant",
			content: inputValue,
			timestamp: new Date().toLocaleTimeString("pt-BR", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		setMessages((prev) => [...prev, assistantMessage]);
		setInputValue("");

		setTimeout(() => {
			const userMessage: ChatMessage = {
				id: (Date.now() + 1).toString(),
				type: "user",
				content:
					"Entendi sua resposta. Deixe-me analisar melhor essa informação...",
				timestamp: new Date().toLocaleTimeString("pt-BR", {
					hour: "2-digit",
					minute: "2-digit",
				}),
				userName: "Ricardo Leite - Seguro Automóvel",
				showCheckmarks: true,
			};
			setMessages((prev) => [...prev, userMessage]);
		}, 1000);
	};

	return (
		<div className='flex flex-col h-full'>
			<div className='flex justify-center mb-4 sm:mb-5 lg:mb-6'>
				<span className='text-xs sm:text-sm text-slate-400'>
					HOJE,{" "}
					{new Date().toLocaleTimeString("pt-BR", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</span>
			</div>

			<div className='flex-1 overflow-y-auto mb-4 sm:mb-5 lg:mb-6 pr-2'>
				<div className='space-y-2 sm:space-y-3'>
					{messages.map((msg) => {
						if (msg.type === "suggestion") {
							return (
								<AISuggestion
									key={msg.id}
									content={msg.content}
									timestamp={msg.timestamp}
									actions={msg.actions || []}
								/>
							);
						}

						return (
							<Message
								key={msg.id}
								type={msg.type}
								content={msg.content}
								timestamp={msg.timestamp}
								userName={msg.userName}
								showCheckmarks={msg.showCheckmarks}
							/>
						);
					})}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<ChatInput
				value={inputValue}
				onChange={setInputValue}
				onSend={handleSendMessage}
			/>
		</div>
	);
}
