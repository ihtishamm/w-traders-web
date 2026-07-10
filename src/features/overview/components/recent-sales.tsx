'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSales } from '@/features/sales/api/use-sales';

export function RecentSales() {
  const { data, isLoading } = useSales({ limit: 5, page: 1 });

  if (isLoading || !data) {
    return <Skeleton className='h-full min-h-[300px] w-full' />;
  }

  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          The {data.data.length} most recent sales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {data.data.length === 0 && (
            <p className='text-muted-foreground text-sm'>No sales yet.</p>
          )}
          {data.data.map((sale) => (
            <div key={sale.id} className='flex items-center'>
              <div className='bg-muted flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium'>
                {sale.customer.name.slice(0, 2).toUpperCase()}
              </div>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {sale.customer.name}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {sale.sale_date}
                </p>
              </div>
              <div className='ml-auto font-medium'>
                Rs. {sale.down_payment_rupees}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
