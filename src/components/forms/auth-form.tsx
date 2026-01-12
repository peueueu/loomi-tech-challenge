"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { TextField } from "@/components/ui/text-field";
import { authFormSchema, AuthFormType } from "./defs/auth-form.defs";
import { useRouter } from "next/navigation";

export function AuthForm() {
	const [checked, setChecked] = React.useState(false);
	const router = useRouter();

	const form = useForm<AuthFormType>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			user: "",
			password: "",
		},
	});

	async function onSubmit(data: AuthFormType) {
		toast.success("Autenticado com sucesso! Seja bem-vindo(a).", {
			position: "top-right",
			style: {
				backgroundColor: "var(--chart-2)",
				color: "var(--card-foreground)",
			},
		});

		const response = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (response.ok) {
			router.push("/dashboard");
		}
	}

	return (
		<div className='w-full'>
			<form
				id='form-rhf-auth'
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 text-card-foreground'
			>
				<FieldGroup>
					<Controller
						name='user'
						control={form.control}
						render={() => (
							<TextField
								name='user'
								control={form.control}
								label='Usuário'
								description='Insira seu Email, CPF ou Passaporte'
								required
							/>
						)}
					/>
					<Controller
						name='password'
						control={form.control}
						render={() => (
							<TextField
								name='password'
								control={form.control}
								label='Senha'
								type='password'
								required
							/>
						)}
					/>
				</FieldGroup>

				<div className='flex items-center justify-between'>
					<Field orientation='horizontal'>
						<Checkbox
							id='remember-user'
							checked={checked}
							onCheckedChange={() => setChecked((prevState) => !prevState)}
						/>
						<Label
							htmlFor='remember-user'
							className='text-sm text-card-foreground'
						>
							Lembrar meu usuário
						</Label>
					</Field>
					<Link
						href={"#"}
						className='text-primary text-sm hover:text-blue-400 transition-colors text-nowrap'
					>
						Esqueci minha senha
					</Link>
				</div>

				<Button
					type='submit'
					form='form-rhf-auth'
					className='w-full'
				>
					Entrar
				</Button>
			</form>
		</div>
	);
}
