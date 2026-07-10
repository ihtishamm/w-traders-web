'use client';
import { Badge } from '@/components/ui/badge';
import type { Collection } from '@/types/collection';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export function getCollectionColumns(
  onAllocateSurplus: (collection: Collection) => void,
  onReverse: (collection: Collection) => void
): ColumnDef<Collection>[] {
  return [
    {
      accessorKey: 'collection_date',
      header: 'DATE'
    },
    {
      id: 'customer',
      header: 'CUSTOMER',
      cell: ({ row }) => (
        <Link
          href={`/dashboard/customers/${row.original.customer.id}`}
          className='hover:underline'
        >
          {row.original.customer.name}
        </Link>
      )
    },
    {
      id: 'recovery_man',
      header: 'RECOVERY MAN',
      cell: ({ row }) => row.original.recovery_man.name
    },
    {
      accessorKey: 'expected_amount_rupees',
      header: 'EXPECTED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Collection['expected_amount_rupees']>()}`
    },
    {
      accessorKey: 'amount_collected_rupees',
      header: 'COLLECTED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Collection['amount_collected_rupees']>()}`
    },
    {
      accessorKey: 'unallocated_surplus_rupees',
      header: 'SURPLUS',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Collection['unallocated_surplus_rupees']>()}`
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<Collection['status']>()}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          data={row.original}
          onAllocateSurplus={onAllocateSurplus}
          onReverse={onReverse}
        />
      )
    }
  ];
}
