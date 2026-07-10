'use client';
import { Badge } from '@/components/ui/badge';
import type { AccountClosing } from '@/types/account-closing';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export function getAccountClosingColumns(): ColumnDef<AccountClosing>[] {
  return [
    {
      id: 'customer',
      header: 'CUSTOMER',
      cell: ({ row }) =>
        row.original.customer ? (
          <Link
            href={`/dashboard/customers/${row.original.customer.id}`}
            className='hover:underline'
          >
            {row.original.customer.name}
          </Link>
        ) : (
          '—'
        )
    },
    {
      accessorKey: 'closing_type',
      header: 'TYPE',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<AccountClosing['closing_type']>()}
        </Badge>
      )
    },
    {
      accessorKey: 'waived_amount_rupees',
      header: 'WAIVED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<AccountClosing['waived_amount_rupees']>()}`
    },
    {
      accessorKey: 'closed_by',
      header: 'CLOSED BY',
      cell: ({ cell }) => cell.getValue<AccountClosing['closed_by']>() ?? '—'
    },
    {
      accessorKey: 'closing_date',
      header: 'CLOSING DATE'
    },
    {
      accessorKey: 'reason',
      header: 'REASON',
      cell: ({ cell }) => cell.getValue<AccountClosing['reason']>() ?? '—'
    }
  ];
}
