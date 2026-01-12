import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
	titleWidth?: string;
	bars?: number;
}

export function ChartSkeleton({
	titleWidth = "w-40",
	bars = 12,
}: ChartSkeletonProps) {
	return (
		<Card className='bg-slate-900 border-slate-700 w-full h-full flex flex-col'>
			<CardHeader>
				<Skeleton className={`h-5 ${titleWidth}`} />
			</CardHeader>

			<CardContent className='w-full flex-1 min-h-0 px-6'>
				<div className='w-full h-full flex flex-col gap-2'>
					{Array.from({ length: bars }).map((_, i) => (
						<Skeleton
							key={i}
							className='h-5 w-full skeleton-shimmer'
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
