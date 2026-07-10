'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useMissedRecoveries } from '@/features/missed-recoveries/api/use-missed-recoveries';
import { getMissedRecoveryColumns } from '@/features/missed-recoveries/components/missed-recovery-tables/columns';
import { MissedRecoveryTable } from '@/features/missed-recoveries/components/missed-recovery-tables';
import { UpdatePromisedDateDialog } from '@/features/missed-recoveries/components/update-promised-date-dialog';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import {
  MISSED_STATUS_OPTIONS,
  type MissedRecovery,
  type MissedStatus
} from '@/types/missed-recovery';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState
} from 'nuqs';
import { useMemo, useState } from 'react';

const ALL = '__all__';

export default function MissedRecoveryListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<MissedStatus>([
      'pending',
      'resolved',
      'waived'
    ]).withDefault('pending')
  );
  const [recoveryManId, setRecoveryManId] = useQueryState(
    'recovery_man_id',
    parseAsString.withDefault('')
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<MissedRecovery | null>(null);

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const { data, isLoading } = useMissedRecoveries({
    page,
    limit: perPage,
    status,
    ...(recoveryManId && { recovery_man_id: recoveryManId })
  });

  const columns = useMemo(
    () =>
      getMissedRecoveryColumns((missedRecovery) => {
        setSelected(missedRecovery);
        setDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {isLoading ? (
        <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
      ) : (
        <MissedRecoveryTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-2'>
              <Select
                value={recoveryManId || ALL}
                onValueChange={(value) =>
                  setRecoveryManId(value === ALL ? '' : value)
                }
              >
                <SelectTrigger className='h-8 w-44'>
                  <SelectValue placeholder='Recovery Man' />
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
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as MissedStatus)}
              >
                <SelectTrigger className='h-8 w-36'>
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
          }
        />
      )}

      <UpdatePromisedDateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        missedRecovery={selected}
      />
    </div>
  );
}
