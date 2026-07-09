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
import { useProductCategories } from '@/features/products/api/use-product-categories';
import { useProducts } from '@/features/products/api/use-products';
import { getProductColumns } from '@/features/products/components/product-tables/columns';
import { ProductFormDialog } from '@/features/products/components/product-form-dialog';
import { ProductTable } from '@/features/products/components/product-tables';
import {
  ACTIVE_STATUS_OPTIONS,
  type ActiveStatus
} from '@/types/active-status';
import type { Product } from '@/types/product';
import { IconPlus } from '@tabler/icons-react';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState
} from 'nuqs';
import { useMemo, useState } from 'react';

const ALL_CATEGORIES = '__all__';

export default function ProductListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<ActiveStatus>(['active', 'inactive']).withDefault(
      'active'
    )
  );
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('')
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { data: categories } = useProductCategories();
  const { data, isLoading } = useProducts({
    page,
    limit: perPage,
    status,
    ...(category && { category })
  });

  const columns = useMemo(
    () =>
      getProductColumns((product) => {
        setEditing(product);
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
          <IconPlus className='mr-2 h-4 w-4' /> New Product
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={7} rowCount={8} filterCount={0} />
      ) : (
        <ProductTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-2'>
              <Select
                value={category || ALL_CATEGORIES}
                onValueChange={(value) =>
                  setCategory(value === ALL_CATEGORIES ? '' : value)
                }
              >
                <SelectTrigger className='h-8 w-40'>
                  <SelectValue placeholder='Category' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_CATEGORIES}>All Categories</SelectItem>
                  {categories?.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          }
        />
      )}

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editing}
      />
    </div>
  );
}
