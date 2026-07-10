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
import { useCustomersClosedReport } from '@/features/reports/api/use-customers-closed-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { AccountClosing, ClosingType } from '@/types/account-closing';
import { useState } from 'react';

const ALL = '__all__';
const CLOSING_TYPE_OPTIONS = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' }
];

export function CustomersClosedReport() {
  const [closingType, setClosingType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const params = {
    ...(closingType && { closing_type: closingType as ClosingType }),
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useCustomersClosedReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
          <div className='space-y-1'>
            <Label>Closing Type</Label>
            <Select
              value={closingType || ALL}
              onValueChange={(value) =>
                setClosingType(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='All Types' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Types</SelectItem>
                {CLOSING_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
          endpoint='/reports/customers/closed'
          params={params}
          filename='customers-closed.csv'
        />
      </div>

      <ReportTable<AccountClosing>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Customer', cell: (row) => row.customer?.name ?? '—' },
          { header: 'Closing Type', cell: (row) => row.closing_type },
          {
            header: 'Waived Amount',
            cell: (row) => `Rs. ${row.waived_amount_rupees}`
          },
          { header: 'Closed By', cell: (row) => row.closed_by ?? '—' },
          { header: 'Closing Date', cell: (row) => row.closing_date },
          { header: 'Reason', cell: (row) => row.reason ?? '—' }
        ]}
      />
    </div>
  );
}
