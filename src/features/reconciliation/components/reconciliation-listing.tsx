'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useReconciliations } from '@/features/reconciliation/api/use-reconciliations';
import { getReconciliationColumns } from '@/features/reconciliation/components/reconciliation-tables/columns';
import { ReconciliationTable } from '@/features/reconciliation/components/reconciliation-tables';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryState
} from 'nuqs';
import { useMemo } from 'react';

const ALL = '__all__';

export default function ReconciliationListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [recoveryManId, setRecoveryManId] = useQueryState(
    'recovery_man_id',
    parseAsString.withDefault('')
  );
  const [hasVariance, setHasVariance] = useQueryState(
    'has_variance',
    parseAsBoolean.withDefault(false)
  );

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const { data, isLoading } = useReconciliations({
    page,
    limit: perPage,
    ...(recoveryManId && { recovery_man_id: recoveryManId }),
    ...(hasVariance && { has_variance: true })
  });

  const columns = useMemo(() => getReconciliationColumns(), []);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/reconciliation/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> Submit Reconciliation
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
      ) : (
        <ReconciliationTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-4'>
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
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='has-variance'
                  checked={hasVariance}
                  onCheckedChange={(checked) =>
                    setHasVariance(checked === true)
                  }
                />
                <Label htmlFor='has-variance' className='text-sm font-normal'>
                  Has variance
                </Label>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
