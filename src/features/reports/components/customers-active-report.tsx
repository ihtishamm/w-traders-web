'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useCustomersActiveReport } from '@/features/reports/api/use-customers-active-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { Customer } from '@/types/customer';
import { useState } from 'react';

const ALL = '__all__';

export function CustomersActiveReport() {
  const [recoveryManId, setRecoveryManId] = useState('');

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const params = { ...(recoveryManId && { recovery_man_id: recoveryManId }) };
  const { data, isLoading } = useCustomersActiveReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
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
        <ReportExportButton
          endpoint='/reports/customers/active'
          params={params}
          filename='customers-active.csv'
        />
      </div>

      <ReportTable<Customer>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Khaata No.', cell: (row) => row.khaata_no },
          { header: 'Name', cell: (row) => row.name },
          {
            header: 'Recovery Man',
            cell: (row) => row.assigned_recovery_man?.name ?? '—'
          },
          {
            header: 'Active Plans',
            cell: (row) => row.active_plans_count ?? 0
          },
          {
            header: 'Outstanding',
            cell: (row) => `Rs. ${row.total_outstanding_rupees ?? 0}`
          }
        ]}
      />
    </div>
  );
}
