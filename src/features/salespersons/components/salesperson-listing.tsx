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
import { useSalespersons } from '@/features/salespersons/api/use-salespersons';
import { getSalespersonColumns } from '@/features/salespersons/components/salesperson-tables/columns';
import { SalespersonFormDialog } from '@/features/salespersons/components/salesperson-form-dialog';
import { SalespersonTable } from '@/features/salespersons/components/salesperson-tables';
import {
  ACTIVE_STATUS_OPTIONS,
  type ActiveStatus
} from '@/types/active-status';
import type { Salesperson } from '@/types/salesperson';
import { IconPlus } from '@tabler/icons-react';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

export default function SalespersonListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<ActiveStatus>(['active', 'inactive']).withDefault(
      'active'
    )
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Salesperson | null>(null);

  const { data, isLoading } = useSalespersons({
    page,
    limit: perPage,
    status
  });

  const columns = useMemo(
    () =>
      getSalespersonColumns((salesperson) => {
        setEditing(salesperson);
        setDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <IconPlus className='mr-2 h-4 w-4' /> New Salesperson
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={4} rowCount={8} filterCount={0} />
      ) : (
        <SalespersonTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as ActiveStatus)}
            >
              <SelectTrigger className='h-8 w-36'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTIVE_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      )}

      <SalespersonFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        salesperson={editing}
      />
    </div>
  );
}
