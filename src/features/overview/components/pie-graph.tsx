'use client';

import { Label, Pie, PieChart } from 'recharts';

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
  count: { label: 'Customers' },
  active: { label: 'Active', color: 'var(--primary)' },
  closed: { label: 'Closed', color: 'var(--primary-light)' }
} satisfies ChartConfig;

export function PieGraph() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading || !data) {
    return <Skeleton className='h-[352px] w-full' />;
  }

  const { active, closed, total } = data.customers;
  const chartData = [
    { segment: 'active', count: active, fill: 'url(#fillactive)' },
    { segment: 'closed', count: closed, fill: 'url(#fillclosed)' }
  ];

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Customer Status</CardTitle>
        <CardDescription>Active vs. closed customer accounts</CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              <linearGradient id='fillactive' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='var(--primary)' stopOpacity={1} />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.8}
                />
              </linearGradient>
              <linearGradient id='fillclosed' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='0%'
                  stopColor='var(--primary)'
                  stopOpacity={0.4}
                />
                <stop
                  offset='100%'
                  stopColor='var(--primary)'
                  stopOpacity={0.25}
                />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='count'
              nameKey='segment'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Total Customers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
