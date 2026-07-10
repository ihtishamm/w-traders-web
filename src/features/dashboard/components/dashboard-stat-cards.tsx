'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '@/features/dashboard/api/use-dashboard-stats';
import { IconTrendingUp } from '@tabler/icons-react';

export function DashboardStatCards() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading || !data) {
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Skeleton key={index} className='h-36 w-full' />
        ))}
      </div>
    );
  }

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            Rs. {data.financials.total_sales_rupees.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              {data.customers.total} customers
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='text-muted-foreground'>
            Rs. {data.financials.total_recovered_rupees.toLocaleString()}{' '}
            recovered
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Active Customers</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.customers.active}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>{data.customers.closed} closed</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='text-muted-foreground'>
            {data.customers.total} total customers
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Total Outstanding</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            Rs. {data.financials.total_outstanding_rupees.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              {data.products.available_units} units in stock
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='text-muted-foreground'>
            {data.products.total} products
          </div>
        </CardFooter>
      </Card>
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Active Recovery Men</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {data.recovery_men.total_active}
          </CardTitle>
          <CardAction>
            <Badge variant='outline'>
              <IconTrendingUp />
              {data.installment_plans.total_sold_units} plans
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='text-muted-foreground'>
            {data.installment_plans.under_repair} under repair ·{' '}
            {data.installment_plans.repossessed} repossessed
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
