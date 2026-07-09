'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useCustomers } from '@/features/customers/api/use-customers';
import { getCustomerColumns } from '@/features/customers/components/customer-tables/columns';
import { CustomerEditDialog } from '@/features/customers/components/customer-edit-dialog';
import { CustomerTable } from '@/features/customers/components/customer-tables';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import {
  CUSTOMER_STATUS_OPTIONS,
  type CustomerStatus
} from '@/types/customer-status';
import type { Customer } from '@/types/customer';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState
} from 'nuqs';
import { useMemo, useState } from 'react';

export default function CustomerListingPage() {
  const router = useRouter();
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<CustomerStatus>(['active', 'closed']).withDefault(
      'active'
    )
  );
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const [searchInput, setSearchInput] = useState(search);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    void setSearch(value || null);
  }, 400);

  const { data, isLoading } = useCustomers({
    page,
    limit: perPage,
    status,
    ...(search && { search })
  });

  const columns = useMemo(
    () =>
      getCustomerColumns((customer) => {
        setEditing(customer);
        setDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <Button onClick={() => router.push('/dashboard/customers/new')}>
          <IconPlus className='mr-2 h-4 w-4' /> New Customer
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={7} rowCount={8} filterCount={0} />
      ) : (
        <CustomerTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Search name, khaata no, phone...'
                className='h-8 w-56'
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                  debouncedSetSearch(event.target.value);
                }}
              />
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as CustomerStatus)}
              >
                <SelectTrigger className='h-8 w-36'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CUSTOMER_STATUS_OPTIONS.map((option) => (
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

      <CustomerEditDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        customer={editing}
      />
    </div>
  );
}
