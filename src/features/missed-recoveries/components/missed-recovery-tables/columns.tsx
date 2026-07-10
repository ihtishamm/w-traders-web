'use client';
import { Badge } from '@/components/ui/badge';
import type { MissedRecovery } from '@/types/missed-recovery';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export function getMissedRecoveryColumns(
  onUpdatePromisedDate: (missedRecovery: MissedRecovery) => void
): ColumnDef<MissedRecovery>[] {
  return [
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
      id: 'product',
      header: 'PRODUCT',
      cell: ({ row }) => row.original.product.name
    },
    {
      accessorKey: 'original_due_date',
      header: 'ORIGINAL DUE'
    },
    {
      accessorKey: 'promised_date',
      header: 'PROMISED DATE',
      cell: ({ cell }) =>
        cell.getValue<MissedRecovery['promised_date']>() ?? '—'
    },
    {
      accessorKey: 'amount_due_rupees',
      header: 'AMOUNT DUE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<MissedRecovery['amount_due_rupees']>()}`
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<MissedRecovery['status']>()}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          data={row.original}
          onUpdatePromisedDate={onUpdatePromisedDate}
        />
      )
    }
  ];
}
