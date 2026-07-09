'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useSale } from '@/features/sales/api/use-sale';
import { CancelSaleDialog } from '@/features/sales/components/cancel-sale-dialog';
import { IconBan } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

interface SaleDetailProps {
  saleId: string;
}

export function SaleDetail({ saleId }: SaleDetailProps) {
  const { data: sale, isLoading } = useSale(saleId);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  if (isLoading || !sale) {
    return <Skeleton className='h-64 w-full' />;
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader className='flex flex-row items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-xl'>
              Sale — {sale.sale_date}
              <Badge variant='outline' className='capitalize'>
                {sale.status}
              </Badge>
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Source: <span className='capitalize'>{sale.source}</span>
            </p>
          </div>
          {sale.status === 'active' && (
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setCancelDialogOpen(true)}
            >
              <IconBan className='mr-2 h-4 w-4' /> Cancel Sale
            </Button>
          )}
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div>
            <p className='text-muted-foreground text-sm'>Customer</p>
            <Link
              href={`/dashboard/customers/${sale.customer.id}`}
              className='font-medium hover:underline'
            >
              {sale.customer.name} ({sale.customer.khaata_no})
            </Link>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Salesperson</p>
            <p>{sale.salesperson?.name ?? '—'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Down Payment</p>
            <p>Rs. {sale.down_payment_rupees}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Extra Advance</p>
            <p>Rs. {sale.extra_advance_rupees}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Installment Plans</CardTitle>
        </CardHeader>
        <CardContent>
          {sale.installment_plans.length === 0 ? (
            <p className='text-muted-foreground text-sm'>
              No installment plans.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Recovery Man</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Weekly Installment</TableHead>
                  <TableHead>Remaining Balance</TableHead>
                  <TableHead>Recovery Day</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.installment_plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.product.name}</TableCell>
                    <TableCell>{plan.recovery_man.name}</TableCell>
                    <TableCell>{plan.quantity}</TableCell>
                    <TableCell>Rs. {plan.total_price_rupees}</TableCell>
                    <TableCell>Rs. {plan.weekly_installment_rupees}</TableCell>
                    <TableCell>Rs. {plan.remaining_balance_rupees}</TableCell>
                    <TableCell className='capitalize'>
                      {plan.recovery_day}
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline' className='capitalize'>
                        {plan.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CancelSaleDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        saleId={sale.id}
      />
    </div>
  );
}
