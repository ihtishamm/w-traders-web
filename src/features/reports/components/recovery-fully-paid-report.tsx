'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRecoveryFullyPaidReport } from '@/features/reports/api/use-recovery-fully-paid-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { AccountClosing } from '@/types/account-closing';
import { useState } from 'react';

export function RecoveryFullyPaidReport() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const params = { ...(from && { from }), ...(to && { to }) };
  const { data, isLoading } = useRecoveryFullyPaidReport(params);

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
          endpoint='/reports/recovery/fully-paid'
          params={params}
          filename='recovery-fully-paid.csv'
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
          { header: 'Closing Date', cell: (row) => row.closing_date }
        ]}
      />
    </div>
  );
}
