'use client';

import { useRecoveryPendingReport } from '@/features/reports/api/use-recovery-pending-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { InstallmentPlan } from '@/types/installment-plan';

export function RecoveryPendingReport() {
  const { data, isLoading } = useRecoveryPendingReport();

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <ReportExportButton
          endpoint='/reports/recovery/pending'
          params={{}}
          filename='recovery-pending.csv'
        />
      </div>

      <ReportTable<InstallmentPlan>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Customer', cell: (row) => row.customer.name },
          { header: 'Product', cell: (row) => row.product.name },
          { header: 'Recovery Man', cell: (row) => row.recovery_man.name },
          {
            header: 'Weekly Installment',
            cell: (row) => `Rs. ${row.weekly_installment_rupees}`
          },
          {
            header: 'Remaining Balance',
            cell: (row) => `Rs. ${row.remaining_balance_rupees}`
          },
          { header: 'Recovery Day', cell: (row) => row.recovery_day },
          { header: 'Next Due', cell: (row) => row.next_recovery_date ?? '—' }
        ]}
      />
    </div>
  );
}
