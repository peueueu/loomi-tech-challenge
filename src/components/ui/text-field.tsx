"use client";

import * as React from "react";
import {
	FieldValues,
	useController,
	type Control,
	type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldError,
	FieldDescription,
	FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type TextFieldProps<T extends FieldValues> = {
	name: Path<T>;
	control: Control<T>;
	label: string;
	description?: string;
	type?: string;
	required?: boolean;
};

export function TextField<T extends FieldValues>({
	name,
	control,
	label,
	description,
	type = "text",
	required = false,
}: TextFieldProps<T>) {
	const {
		field,
		fieldState: { invalid, error },
	} = useController({ name, control });

	return (
		<Field
			data-invalid={invalid}
			className='relative'
		>
			<Input
				{...field}
				type={type}
				placeholder=' '
				aria-invalid={invalid}
				aria-required={required}
				className='peer bg-background'
			/>

			<FieldLabel
				htmlFor={field.name}
				className={cn(
					"pointer-events-none absolute left-3",
					"inline-flex w-fit max-w-max",
					"items-center whitespace-nowrap",
					"bg-background px-1",
					"text-sm text-muted-foreground",
					"transition-all duration-200",

					"top-4.5 -translate-y-1/2",

					"peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-card-foreground",
					"peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:-translate-y-1/2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-card-foreground",
					"peer-aria-invalid:top-0 peer-aria-invalid:-translate-y-1/2 peer-aria-invalid:text-xs peer-aria-invalid:text-destructive",
				)}
			>
				{label}
				{required && <span className='-ml-1 text-destructive'>*</span>}
			</FieldLabel>

			{description && <FieldDescription>{description}</FieldDescription>}
			{invalid && <FieldError errors={[error]} />}
		</Field>
	);
}
