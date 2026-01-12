import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex h-screen bg-slate-950'>
			<Sidebar />
			<div className='flex-1 flex flex-col ml-37.5'>
				<Header />
				<main className='flex-1 overflow-auto bg-slate-950 p-8'>
					{children}
				</main>
			</div>
		</div>
	);
}
