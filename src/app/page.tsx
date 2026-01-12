import Image from "next/image";
import { AuthForm } from "@/components/forms/auth-form";
import { Button } from "@/components/ui/button";

export default function Auth() {
	return (
		<main className='min-h-screen w-full bg-background'>
			<div className='mx-auto w-full max-w-480 min-h-screen flex flex-col'>
				<div className='flex items-center px-4 sm:px-6 md:px-8 lg:px-8 py-8 sm:py-12 lg:py-16'>
					<Image
						src='/nortus-logo.svg'
						width={174}
						height={54}
						className='justify-start'
						alt='Logo displaying the name Nortus in blue'
					/>
				</div>

				<div className='flex flex-1'>
					<div className='flex flex-1 items-center justify-center px-6 xl:justify-start lg:px-12 xl:px-20'>
						<div className='w-full max-w-3xl'>
							<div className='mb-8 sm:mb-10'>
								<h1 className='text-3xl sm:text-4xl font-bold text-slate-100 mb-2'>
									Login
								</h1>
								<p className='text-sm sm:text-base text-card-foreground'>
									Entre com seus credenciais para acessar a sua conta.
								</p>
							</div>
							<AuthForm />
						</div>
					</div>

					<div className='hidden xl:flex flex-1 items-center justify-center xl:mr-12 2xl:mr-20'>
						<div className='relative aspect-934/952 w-175'>
							<div className='absolute top-0 right-[18%] translate-x-1/2 z-10 flex gap-4'>
								<Button className='p-8 bg-slate-700 rounded-[64px] cursor-pointer'>
									<Image
										src='/customer-support.svg'
										width={22}
										height={22}
										alt='Suporte ao cliente'
									/>
									Ajuda
								</Button>
								<Button className='py-6 px-2 bg-slate-700 rounded-[64px] cursor-pointer'>
									<Image
										src='/arrow-down.svg'
										width={15}
										height={15}
										alt='Seta para baixo'
									/>
									<Image
										src='/country-code.svg'
										width={17}
										height={17}
										alt='Bandeira de um país'
									/>
									PT br
								</Button>
							</div>
							<Image
								src='/home-banner.png'
								alt='Home banner'
								fill
								priority
								className='object-contain'
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
