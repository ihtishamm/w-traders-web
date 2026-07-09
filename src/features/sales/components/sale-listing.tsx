'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { CancelSaleDialog } from '@/features/sales/components/cancel-sale-dialog';
import { useSales } from '@/features/sales/api/use-sales';
import { getSaleColumns } from '@/features/sales/components/sale-tables/columns';
import { SaleTable } from '@/features/sales/components/sale-tables';
import type { Sale, SaleStatus } from '@/types/sale';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

const SALE_STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' }
];

export default function SaleListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum(['all', 'active', 'cancelled', 'completed']).withDefault(
      'all'
    )
  );

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelling, setCancelling] = useState<Sale | null>(null);

  const { data, isLoading } = useSales({
    page,
    limit: perPage,
    ...(status !== 'all' && { status: status as SaleStatus })
  });

  const columns = useMemo(
    () =>
      getSaleColumns((sale) => {
        setCancelling(sale);
        setCancelDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/sales/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> New Sale
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={7} rowCount={8} filterCount={0} />
      ) : (
        <SaleTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as never)}
            >
              <SelectTrigger className='h-8 w-40'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SALE_STATUS_FILTER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      )}

      <CancelSaleDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        saleId={cancelling?.id ?? null}
      />
    </div>
  );
}
