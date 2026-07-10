'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
import { useSalesTrend } from '@/features/reports/api/use-sales-trend';

const chartConfig = {
  total_amount_rupees: {
    label: 'Sales (Rs.)',
    color: 'var(--primary)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  const { data, isLoading } = useSalesTrend(6);

  if (isLoading || !data) {
    return <Skeleton className='h-[352px] w-full' />;
  }

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Sales Trend</CardTitle>
        <CardDescription>
          Total sales amount for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={data} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id='fillSales' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-total_amount_rupees)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-total_amount_rupees)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='label'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='total_amount_rupees'
              type='natural'
              fill='url(#fillSales)'
              stroke='var(--color-total_amount_rupees)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
