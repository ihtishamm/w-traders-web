'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccountClosing } from '@/features/account-closing/api/use-account-closing';
import Link from 'next/link';

interface AccountClosingDetailProps {
  customerId: string;
}

export function AccountClosingDetail({
  customerId
}: AccountClosingDetailProps) {
  const { data: closing, isLoading } = useAccountClosing(customerId);

  if (isLoading || !closing) {
    return <Skeleton className='h-48 w-full' />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          Account Closing
          <Badge variant='outline' className='capitalize'>
            {closing.closing_type}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 md:grid-cols-2'>
        <div>
          <p className='text-muted-foreground text-sm'>Customer</p>
          {closing.customer ? (
            <Link
              href={`/dashboard/customers/${closing.customer.id}`}
              className='font-medium hover:underline'
            >
              {closing.customer.name}
            </Link>
          ) : (
            <p>—</p>
          )}
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Closing Date</p>
          <p>{closing.closing_date}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Waived Amount</p>
          <p>Rs. {closing.waived_amount_rupees}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Closed By</p>
          <p>{closing.closed_by ?? '—'}</p>
        </div>
        <div className='md:col-span-2'>
          <p className='text-muted-foreground text-sm'>Reason</p>
          <p>{closing.reason ?? '—'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
