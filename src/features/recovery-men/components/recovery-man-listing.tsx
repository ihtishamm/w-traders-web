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
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { getRecoveryManColumns } from '@/features/recovery-men/components/recovery-man-tables/columns';
import { RecoveryManFormDialog } from '@/features/recovery-men/components/recovery-man-form-dialog';
import { RecoveryManTable } from '@/features/recovery-men/components/recovery-man-tables';
import {
  ACTIVE_STATUS_OPTIONS,
  type ActiveStatus
} from '@/types/active-status';
import type { RecoveryMan } from '@/types/recovery-man';
import { IconPlus } from '@tabler/icons-react';
import { parseAsInteger, parseAsStringEnum, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

export default function RecoveryManListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<ActiveStatus>(['active', 'inactive']).withDefault(
      'active'
    )
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<RecoveryMan | null>(null);

  const { data, isLoading } = useRecoveryMen({
    page,
    limit: perPage,
    status
  });

  const columns = useMemo(
    () =>
      getRecoveryManColumns((recoveryMan) => {
        setEditing(recoveryMan);
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
          <IconPlus className='mr-2 h-4 w-4' /> New Recovery Man
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={4} rowCount={8} filterCount={0} />
      ) : (
        <RecoveryManTable
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

      <RecoveryManFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        recoveryMan={editing}
      />
    </div>
  );
}
