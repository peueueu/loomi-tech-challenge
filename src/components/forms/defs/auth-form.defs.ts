import * as z from "zod";
import { isValidCPF } from "@/lib/cpf-validator";

const userSchema = z
	.string()
	.min(1, "Campo Obrigatório")
	.refine((value) => {
		const isEmail = z.email().safeParse(value).success;
		const isCPF = isValidCPF(value);
		const isPassport = /^[A-Z0-9]{6,9}$/i.test(value);

		return isEmail || isCPF || isPassport;
	});

const authFormSchema = z.object({
	user: userSchema,
	password: z.string().min(5, "Campo Obrigatório"),
});

export type AuthFormType = z.infer<typeof authFormSchema>;

export { authFormSchema, userSchema };
