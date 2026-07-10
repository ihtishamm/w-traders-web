'use client';

import { Button } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { AllocateSurplusDialog } from '@/features/collections/components/allocate-surplus-dialog';
import { useCollections } from '@/features/collections/api/use-collections';
import { getCollectionColumns } from '@/features/collections/components/collection-tables/columns';
import { CollectionTable } from '@/features/collections/components/collection-tables';
import { ReverseCollectionDialog } from '@/features/collections/components/reverse-collection-dialog';
import type { Collection } from '@/types/collection';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

export default function CollectionListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));

  const [allocateOpen, setAllocateOpen] = useState(false);
  const [reverseOpen, setReverseOpen] = useState(false);
  const [selected, setSelected] = useState<Collection | null>(null);

  const { data, isLoading } = useCollections({ page, limit: perPage });

  const columns = useMemo(
    () =>
      getCollectionColumns(
        (collection) => {
          setSelected(collection);
          setAllocateOpen(true);
        },
        (collection) => {
          setSelected(collection);
          setReverseOpen(true);
        }
      ),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/collections/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> Record Collection
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={7} rowCount={8} filterCount={0} />
      ) : (
        <CollectionTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
        />
      )}

      <AllocateSurplusDialog
        open={allocateOpen}
        onOpenChange={setAllocateOpen}
        collection={selected}
      />
      <ReverseCollectionDialog
        open={reverseOpen}
        onOpenChange={setReverseOpen}
        collectionId={selected?.id ?? null}
      />
    </div>
  );
}
