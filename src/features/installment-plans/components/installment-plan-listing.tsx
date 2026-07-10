'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useInstallmentPlans } from '@/features/installment-plans/api/use-installment-plans';
import { ChangeRecoveryDayDialog } from '@/features/installment-plans/components/change-recovery-day-dialog';
import { getInstallmentPlanColumns } from '@/features/installment-plans/components/installment-plan-tables/columns';
import { InstallmentPlanTable } from '@/features/installment-plans/components/installment-plan-tables';
import { ReassignRecoveryManDialog } from '@/features/installment-plans/components/reassign-recovery-man-dialog';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import {
  INSTALLMENT_TYPE_OPTIONS,
  PLAN_STATUS_OPTIONS,
  type InstallmentPlan,
  type InstallmentType,
  type PlanStatus
} from '@/types/installment-plan';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

const ALL = '__all__';

export default function InstallmentPlanListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault('')
  );
  const [recoveryManId, setRecoveryManId] = useQueryState(
    'recovery_man_id',
    parseAsString.withDefault('')
  );
  const [installmentType, setInstallmentType] = useQueryState(
    'installment_type',
    parseAsString.withDefault('')
  );

  const [reassignOpen, setReassignOpen] = useState(false);
  const [changeDayOpen, setChangeDayOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<InstallmentPlan | null>(
    null
  );

  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const { data, isLoading } = useInstallmentPlans({
    page,
    limit: perPage,
    ...(status && { status: status as PlanStatus }),
    ...(recoveryManId && { recovery_man_id: recoveryManId }),
    ...(installmentType && {
      installment_type: installmentType as InstallmentType
    })
  });

  const columns = useMemo(
    () =>
      getInstallmentPlanColumns(
        (plan) => {
          setSelectedPlan(plan);
          setReassignOpen(true);
        },
        (plan) => {
          setSelectedPlan(plan);
          setChangeDayOpen(true);
        }
      ),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {isLoading ? (
        <DataTableSkeleton columnCount={9} rowCount={8} filterCount={0} />
      ) : (
        <InstallmentPlanTable
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
                value={status || ALL}
                onValueChange={(value) => setStatus(value === ALL ? '' : value)}
              >
                <SelectTrigger className='h-8 w-36'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Statuses</SelectItem>
                  {PLAN_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={installmentType || ALL}
                onValueChange={(value) =>
                  setInstallmentType(value === ALL ? '' : value)
                }
              >
                <SelectTrigger className='h-8 w-36'>
                  <SelectValue placeholder='Installment Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Types</SelectItem>
                  {INSTALLMENT_TYPE_OPTIONS.map((option) => (
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

      <ReassignRecoveryManDialog
        open={reassignOpen}
        onOpenChange={setReassignOpen}
        plan={selectedPlan}
      />
      <ChangeRecoveryDayDialog
        open={changeDayOpen}
        onOpenChange={setChangeDayOpen}
        plan={selectedPlan}
      />
    </div>
  );
}
