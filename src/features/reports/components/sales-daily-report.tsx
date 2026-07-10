'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDailySalesReport } from '@/features/reports/api/use-daily-sales-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { Sale } from '@/types/sale';
import { useState } from 'react';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function SalesDailyReport() {
  const [date, setDate] = useState(today());
  const { data, isLoading } = useDailySalesReport(date);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='space-y-1'>
          <Label>Date</Label>
          <Input
            type='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className='w-44'
          />
        </div>
        <ReportExportButton
          endpoint='/reports/sales/daily'
          params={{ date }}
          filename={`sales-daily-${date}.csv`}
        />
      </div>

      {data && (
        <div className='grid grid-cols-3 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-muted-foreground text-sm font-normal'>
                Sales Count
              </CardTitle>
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
              {data.totals.sales_count}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-muted-foreground text-sm font-normal'>
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
              Rs. {data.totals.total_amount_rupees}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-muted-foreground text-sm font-normal'>
                Total Down Payment
              </CardTitle>
            </CardHeader>
            <CardContent className='text-2xl font-bold'>
              Rs. {data.totals.total_down_payment_rupees}
            </CardContent>
          </Card>
        </div>
      )}

      <ReportTable<Sale>
        isLoading={isLoading}
        rows={data?.sales ?? []}
        columns={[
          { header: 'Customer', cell: (row) => row.customer.name },
          {
            header: 'Salesperson',
            cell: (row) => row.salesperson?.name ?? '—'
          },
          {
            header: 'Down Payment',
            cell: (row) => `Rs. ${row.down_payment_rupees}`
          },
          { header: 'Status', cell: (row) => row.status },
          { header: 'Items', cell: (row) => row.installment_plans.length }
        ]}
      />
    </div>
  );
}
