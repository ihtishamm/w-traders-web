'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '@/features/dashboard/api/use-dashboard-stats';

const chartConfig = {
  count: {
    label: 'Plans',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading || !data) {
    return <Skeleton className='h-[352px] w-full' />;
  }

  const plans = data.installment_plans;
  const chartData = [
    { status: 'Sold', count: plans.total_sold_units },
    { status: 'Returned (unused)', count: plans.returned_unused },
    { status: 'Returned (used)', count: plans.returned_used },
    { status: 'Under Repair', count: plans.under_repair },
    { status: 'Repossessed', count: plans.repossessed }
  ];

  return (
    <Card className='@container/card !pt-3'>
      <CardHeader>
        <CardTitle>Installment Plans</CardTitle>
        <CardDescription>
          Breakdown of all installment plan units by status
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='status'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey='count' fill='var(--primary)' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
