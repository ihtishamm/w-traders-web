'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useCustomerDailyList } from '@/features/customers/api/use-customer-daily-list';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { IconPrinter } from '@tabler/icons-react';
import { useState } from 'react';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function DailyListPage() {
  const [recoveryManId, setRecoveryManId] = useState<string>('');
  const [date, setDate] = useState<string>(today());

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const { data, isLoading } = useCustomerDailyList(
    recoveryManId ? { recovery_man_id: recoveryManId, date } : null
  );

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end gap-4 print:hidden'>
        <div className='space-y-1'>
          <Label>Recovery Man</Label>
          <Select value={recoveryManId} onValueChange={setRecoveryManId}>
            <SelectTrigger className='w-56'>
              <SelectValue placeholder='Select recovery man' />
            </SelectTrigger>
            <SelectContent>
              {recoveryMen?.data.map((rm) => (
                <SelectItem key={rm.id} value={rm.id}>
                  {rm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1'>
          <Label>Date</Label>
          <Input
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className='w-44'
          />
        </div>
        {data && (
          <Button variant='outline' onClick={() => window.print()}>
            <IconPrinter className='mr-2 h-4 w-4' /> Print
          </Button>
        )}
      </div>

      {!recoveryManId && (
        <p className='text-muted-foreground text-sm'>
          Select a recovery man and date to view their daily recovery list.
        </p>
      )}

      {isLoading && recoveryManId && (
        <p className='text-muted-foreground text-sm'>Loading...</p>
      )}

      {data && (
        <div className='space-y-4'>
          <div>
            <h3 className='text-lg font-semibold'>
              {data.recovery_man.name} — {data.date} ({data.day_of_week})
            </h3>
            <p className='text-muted-foreground text-sm'>
              Grand total expected: Rs. {data.grand_total_expected_rupees}
            </p>
          </div>

          {data.customers.length === 0 ? (
            <p className='text-muted-foreground text-sm'>
              No customers due for recovery on this day.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khaata No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Plans Due Today</TableHead>
                  <TableHead>Missed Amount Due</TableHead>
                  <TableHead>Total Expected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.customers.map((customer) => (
                  <TableRow key={customer.customer_id}>
                    <TableCell>{customer.khaata_no}</TableCell>
                    <TableCell>
                      <div>{customer.name}</div>
                      <div className='text-muted-foreground text-xs'>
                        {customer.residential_address}
                      </div>
                    </TableCell>
                    <TableCell>{customer.phone ?? '—'}</TableCell>
                    <TableCell>
                      {customer.plans_due_today.length === 0 ? (
                        '—'
                      ) : (
                        <div className='space-y-1'>
                          {customer.plans_due_today.map((plan) => (
                            <div
                              key={plan.installment_plan_id}
                              className='text-sm'
                            >
                              {plan.product_name}:{' '}
                              <Badge variant='outline'>
                                Rs. {plan.weekly_installment_rupees}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      Rs. {customer.missed_amount_due_rupees}
                    </TableCell>
                    <TableCell className='font-medium'>
                      Rs. {customer.total_expected_rupees}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
}
