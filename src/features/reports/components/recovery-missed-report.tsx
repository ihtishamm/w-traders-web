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
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useRecoveryMissedReport } from '@/features/reports/api/use-recovery-missed-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import {
  MISSED_STATUS_OPTIONS,
  type MissedRecovery,
  type MissedStatus
} from '@/types/missed-recovery';
import { useState } from 'react';

const ALL = '__all__';

export function RecoveryMissedReport() {
  const [recoveryManId, setRecoveryManId] = useState('');
  const [status, setStatus] = useState<MissedStatus>('pending');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const params = {
    ...(recoveryManId && { recovery_man_id: recoveryManId }),
    status,
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useRecoveryMissedReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
          <div className='space-y-1'>
            <Label>Recovery Man</Label>
            <Select
              value={recoveryManId || ALL}
              onValueChange={(value) =>
                setRecoveryManId(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='All Recovery Men' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Recovery Men</SelectItem>
                {recoveryMen?.data.map((rm) => (
                  <SelectItem key={rm.id} value={rm.id}>
                    {rm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as MissedStatus)}
            >
              <SelectTrigger className='w-36'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MISSED_STATUS_OPTIONS.map((option) => (
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
          endpoint='/reports/recovery/missed'
          params={params}
          filename='recovery-missed.csv'
        />
      </div>

      <ReportTable<MissedRecovery>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Customer', cell: (row) => row.customer.name },
          { header: 'Product', cell: (row) => row.product.name },
          { header: 'Original Due', cell: (row) => row.original_due_date },
          { header: 'Promised Date', cell: (row) => row.promised_date ?? '—' },
          {
            header: 'Amount Due',
            cell: (row) => `Rs. ${row.amount_due_rupees}`
          },
          { header: 'Status', cell: (row) => row.status }
        ]}
      />
    </div>
  );
}
