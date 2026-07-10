'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMonthlySalesReport } from '@/features/reports/api/use-monthly-sales-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { Sale } from '@/types/sale';
import { useState } from 'react';

function currentYearMonth(): { year: number; month: number } {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

export function SalesMonthlyReport() {
  const [{ year, month }, setYearMonth] = useState(currentYearMonth());
  const { data, isLoading } = useMonthlySalesReport(year, month);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex items-end gap-4'>
          <div className='space-y-1'>
            <Label>Year</Label>
            <Input
              type='number'
              value={year}
              onChange={(event) =>
                setYearMonth((prev) => ({
                  ...prev,
                  year: Number(event.target.value)
                }))
              }
              className='w-28'
            />
          </div>
          <div className='space-y-1'>
            <Label>Month</Label>
            <Input
              type='number'
              min={1}
              max={12}
              value={month}
              onChange={(event) =>
                setYearMonth((prev) => ({
                  ...prev,
                  month: Number(event.target.value)
                }))
              }
              className='w-24'
            />
          </div>
        </div>
        <ReportExportButton
          endpoint='/reports/sales/monthly'
          params={{ year, month }}
          filename={`sales-monthly-${year}-${month}.csv`}
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
          { header: 'Date', cell: (row) => row.sale_date },
          { header: 'Customer', cell: (row) => row.customer.name },
          {
            header: 'Salesperson',
            cell: (row) => row.salesperson?.name ?? '—'
          },
          {
            header: 'Down Payment',
            cell: (row) => `Rs. ${row.down_payment_rupees}`
          },
          { header: 'Status', cell: (row) => row.status }
        ]}
      />
    </div>
  );
}
