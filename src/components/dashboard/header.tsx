"use client";

import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";
import { Shield } from "lucide-react";

export function Header() {
	const pathname = usePathname();

	const currentPage = navigationItems.find((item) => item.href === pathname);
	const pageTitle = currentPage?.label || "Dashboard";

	return (
		<header className='w-full h-16 bg-linear-to-r from-slate-900 to-slate-800 border-b border-slate-700 flex items-center px-8'>
			<div className='flex items-center gap-3'>
				<div className='flex items-center justify-center w-8 h-8 rounded bg-slate-800'>
					<Shield
						className='w-4 h-4 text-slate-300'
						strokeWidth={1.5}
					/>
				</div>
				<h1 className='text-lg font-semibold text-slate-100'>{pageTitle}</h1>
			</div>
		</header>
	);
}
