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
import { useInstallmentPlans } from '@/features/installment-plans/api/use-installment-plans';
import { CompleteRepairDialog } from '@/features/returns/components/complete-repair-dialog';
import {
  getReturnColumns,
  type PlanLookupEntry
} from '@/features/returns/components/return-tables/columns';
import { ReturnTable } from '@/features/returns/components/return-tables';
import { useReturns } from '@/features/returns/api/use-returns';
import {
  RETURN_TYPE_OPTIONS,
  type ProductReturn,
  type ReturnType
} from '@/types/product-return';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

const ALL = '__all__';

export default function ReturnListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [returnType, setReturnType] = useQueryState(
    'return_type',
    parseAsString.withDefault('')
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<ProductReturn | null>(null);

  const { data, isLoading } = useReturns({
    page,
    limit: perPage,
    ...(returnType && { return_type: returnType as ReturnType })
  });

  // The returns list only carries raw installment_plan_id — fetch plans to
  // resolve customer/product names for display.
  const { data: plans } = useInstallmentPlans({ limit: 100 });
  const planLookup = useMemo(() => {
    const lookup: Record<string, PlanLookupEntry> = {};
    for (const plan of plans?.data ?? []) {
      lookup[plan.id] = {
        customerName: plan.customer.name,
        productName: plan.product.name
      };
    }
    return lookup;
  }, [plans]);

  const columns = useMemo(
    () =>
      getReturnColumns(planLookup, (productReturn) => {
        setSelected(productReturn);
        setDialogOpen(true);
      }),
    [planLookup]
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/returns/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> Record Return
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={8} rowCount={8} filterCount={0} />
      ) : (
        <ReturnTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <Select
              value={returnType || ALL}
              onValueChange={(value) =>
                setReturnType(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='h-8 w-44'>
                <SelectValue placeholder='Return Type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Types</SelectItem>
                {RETURN_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      )}

      <CompleteRepairDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        productReturn={selected}
      />
    </div>
  );
}
