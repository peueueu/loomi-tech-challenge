import { NextResponse } from "next/server";
import { authFormSchema } from "@/components/forms/defs/auth-form.defs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const parsed = authFormSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ error: "Invalid request body", issues: parsed.error },
				{ status: 422 },
			);
		}

		const response = await fetch(
			`${process.env.BACKEND_BASE_URL!}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: "user@example.com",
					password: "string",
				}),
			},
		);

		const data = await response.json();

		(await cookies()).set("access_token", data.access_token);

		return NextResponse.json({ response: response }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
