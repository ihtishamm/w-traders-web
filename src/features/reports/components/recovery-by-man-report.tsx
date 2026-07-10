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
import { useRecoveryByManReport } from '@/features/reports/api/use-recovery-by-man-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { RecoveryByManRow } from '@/types/report';
import { useState } from 'react';

const ALL = '__all__';

export function RecoveryByManReport() {
  const [recoveryManId, setRecoveryManId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const params = {
    ...(recoveryManId && { recovery_man_id: recoveryManId }),
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useRecoveryByManReport(params);

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
          endpoint='/reports/recovery/by-recovery-man'
          params={params}
          filename='recovery-by-man.csv'
        />
      </div>

      <ReportTable<RecoveryByManRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Recovery Man', cell: (row) => row.recovery_man.name },
          {
            header: 'Customers Assigned',
            cell: (row) => row.customers_assigned
          },
          {
            header: 'Expected',
            cell: (row) => `Rs. ${row.expected_total_rupees}`
          },
          {
            header: 'Collected',
            cell: (row) => `Rs. ${row.collected_total_rupees}`
          },
          { header: 'Missed', cell: (row) => `Rs. ${row.missed_total_rupees}` },
          {
            header: 'Variance',
            cell: (row) => `Rs. ${row.variance_total_rupees}`
          }
        ]}
      />
    </div>
  );
}
