'use client';

import { useCustomersPendingInstallmentsReport } from '@/features/reports/api/use-customers-pending-installments-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { PendingInstallmentCustomerRow } from '@/types/report';

export function CustomersPendingInstallmentsReport() {
  const { data, isLoading } = useCustomersPendingInstallmentsReport();

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <ReportExportButton
          endpoint='/reports/customers/pending-installments'
          params={{}}
          filename='customers-pending-installments.csv'
        />
      </div>

      <ReportTable<PendingInstallmentCustomerRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Khaata No.', cell: (row) => row.customer.khaata_no },
          { header: 'Customer', cell: (row) => row.customer.name },
          {
            header: 'Total Pending',
            cell: (row) => `Rs. ${row.total_pending_rupees}`
          }
        ]}
      />
    </div>
  );
}
