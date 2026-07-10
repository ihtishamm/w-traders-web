'use client';

import { useCurrentStockReport } from '@/features/reports/api/use-current-stock-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { CurrentStockRow } from '@/types/report';

export function InventoryCurrentStockReport() {
  const { data, isLoading } = useCurrentStockReport();

  return (
    <div className='space-y-4'>
      <div className='flex justify-end'>
        <ReportExportButton
          endpoint='/reports/inventory/current-stock'
          params={{}}
          filename='inventory-current-stock.csv'
        />
      </div>

      <ReportTable<CurrentStockRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Product', cell: (row) => row.product.name },
          { header: 'Category', cell: (row) => row.product.category },
          { header: 'In Stock', cell: (row) => row.product.stock_quantity },
          { header: 'Under Repair', cell: (row) => row.units_under_repair },
          { header: 'Repossessed', cell: (row) => row.units_repossessed }
        ]}
      />
    </div>
  );
}
