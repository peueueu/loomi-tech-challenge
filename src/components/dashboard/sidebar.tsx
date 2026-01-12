"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import { useUserStore } from "@/store/user.store";
import { Shield } from "lucide-react";

export function Sidebar() {
	const pathname = usePathname();
	const { user } = useUserStore();

	const getInitials = (name: string | null | undefined): string => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<aside className='fixed left-0 top-0 h-screen w-37.5 bg-linear-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col items-center py-8 px-4 rounded-br-[26px]'>
			<div className='flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800 mb-16'>
				<Shield
					className='w-6 h-6 text-slate-300'
					strokeWidth={1.5}
				/>
			</div>

			<nav className='flex-1 flex flex-col items-center justify-center gap-8 w-full'>
				{navigationItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.id}
							href={item.href}
							className={`relative flex items-center justify-center w-16 h-15 rounded-lg transition-all duration-200 ${
								isActive
									? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
									: "bg-slate-700 text-slate-400 hover:text-slate-300 hover:bg-slate-600"
							}`}
							title={item.label}
						>
							<Icon
								className='w-6 h-6'
								strokeWidth={1.5}
							/>
						</Link>
					);
				})}
			</nav>

			<div className='flex items-center justify-center w-16 h-15 rounded-full bg-blue-500 text-white font-semibold text-sm'>
				{getInitials(user?.name)}
			</div>
		</aside>
	);
}
