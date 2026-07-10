'use client';

import { Button } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useAccountClosings } from '@/features/account-closing/api/use-account-closings';
import { getAccountClosingColumns } from '@/features/account-closing/components/account-closing-tables/columns';
import { AccountClosingTable } from '@/features/account-closing/components/account-closing-tables';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';

export default function AccountClosingListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const { data, isLoading } = useAccountClosings({ page, limit: perPage });

  const columns = useMemo(() => getAccountClosingColumns(), []);

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/account-closing/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> Close Account
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={6} rowCount={8} filterCount={0} />
      ) : (
        <AccountClosingTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
        />
      )}
    </div>
  );
}
