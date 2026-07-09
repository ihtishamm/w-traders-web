'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useCustomerSummary } from '@/features/customers/api/use-customer-summary';

interface CustomerAccountSummaryProps {
  customerId: string;
}

export function CustomerAccountSummary({
  customerId
}: CustomerAccountSummaryProps) {
  const { data, isLoading } = useCustomerSummary(customerId);

  if (isLoading || !data) {
    return null;
  }

  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-muted-foreground text-sm font-normal'>
              Total Outstanding
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            Rs. {data.total_outstanding_rupees}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-muted-foreground text-sm font-normal'>
              Installment Plans
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            {data.installment_plans.length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-muted-foreground text-sm font-normal'>
              Missed Recoveries
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            {data.missed_recoveries.length}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installment Plans</CardTitle>
        </CardHeader>
        <CardContent>
          {data.installment_plans.length === 0 ? (
            <p className='text-muted-foreground text-sm'>
              No installment plans.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Recovery Man</TableHead>
                  <TableHead>Weekly Installment</TableHead>
                  <TableHead>Remaining Balance</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.installment_plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>{plan.product.name}</TableCell>
                    <TableCell>{plan.recovery_man.name}</TableCell>
                    <TableCell>Rs. {plan.weekly_installment_rupees}</TableCell>
                    <TableCell>Rs. {plan.remaining_balance_rupees}</TableCell>
                    <TableCell>{plan.next_recovery_date ?? '—'}</TableCell>
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

      <Card>
        <CardHeader>
          <CardTitle>Missed Recoveries</CardTitle>
        </CardHeader>
        <CardContent>
          {data.missed_recoveries.length === 0 ? (
            <p className='text-muted-foreground text-sm'>
              No missed recoveries.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Original Due</TableHead>
                  <TableHead>Promised Date</TableHead>
                  <TableHead>Amount Due</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.missed_recoveries.map((missed) => (
                  <TableRow key={missed.id}>
                    <TableCell>{missed.product.name}</TableCell>
                    <TableCell>{missed.original_due_date}</TableCell>
                    <TableCell>{missed.promised_date ?? '—'}</TableCell>
                    <TableCell>Rs. {missed.amount_due_rupees}</TableCell>
                    <TableCell>
                      <Badge variant='outline' className='capitalize'>
                        {missed.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
