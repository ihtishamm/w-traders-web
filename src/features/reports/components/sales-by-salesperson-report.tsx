'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSalespersons } from '@/features/salespersons/api/use-salespersons';
import { useSalesBySalespersonReport } from '@/features/reports/api/use-sales-by-salesperson-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { SalesBySalespersonRow } from '@/types/report';
import { useState } from 'react';

const ALL = '__all__';

export function SalesBySalespersonReport() {
  const [salespersonId, setSalespersonId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { data: salespersons } = useSalespersons({
    limit: 100,
    status: 'active'
  });
  const params = {
    ...(salespersonId && { salesperson_id: salespersonId }),
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useSalesBySalespersonReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
          <div className='space-y-1'>
            <Label>Salesperson</Label>
            <Select
              value={salespersonId || ALL}
              onValueChange={(value) =>
                setSalespersonId(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='All Salespersons' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Salespersons</SelectItem>
                {salespersons?.data.map((sp) => (
                  <SelectItem key={sp.id} value={sp.id}>
                    {sp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label>From</Label>
            <Input
              type='date'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label>To</Label>
            <Input
              type='date'
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <ReportExportButton
          endpoint='/reports/sales/by-salesperson'
          params={params}
          filename='sales-by-salesperson.csv'
        />
      </div>

      <ReportTable<SalesBySalespersonRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          {
            header: 'Salesperson',
            cell: (row) => row.salesperson?.name ?? '—'
          },
          { header: 'Sales Count', cell: (row) => row.sales_count },
          { header: 'Products Sold', cell: (row) => row.product_count },
          { header: 'Returns', cell: (row) => row.return_count },
          {
            header: 'Total Amount',
            cell: (row) => `Rs. ${row.total_amount_rupees}`
          }
        ]}
      />
    </div>
  );
}
