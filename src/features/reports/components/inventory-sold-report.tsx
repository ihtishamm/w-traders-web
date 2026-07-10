'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSoldInventoryReport } from '@/features/reports/api/use-sold-inventory-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { SoldInventoryRow } from '@/types/report';
import { useState } from 'react';

export function InventorySoldReport() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const params = { ...(from && { from }), ...(to && { to }) };
  const { data, isLoading } = useSoldInventoryReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
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
          endpoint='/reports/inventory/sold'
          params={params}
          filename='inventory-sold.csv'
        />
      </div>

      <ReportTable<SoldInventoryRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Product', cell: (row) => row.product.name },
          { header: 'Customer', cell: (row) => row.customer?.name ?? '—' },
          { header: 'Quantity', cell: (row) => row.quantity },
          {
            header: 'Date',
            cell: (row) => new Date(row.created_at).toLocaleDateString()
          }
        ]}
      />
    </div>
  );
}
