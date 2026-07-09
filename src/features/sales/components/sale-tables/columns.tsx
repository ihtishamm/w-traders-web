'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Sale } from '@/types/sale';
import type { Column, ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export function getSaleColumns(
  onCancel: (sale: Sale) => void
): ColumnDef<Sale>[] {
  return [
    {
      id: 'sale_date',
      accessorKey: 'sale_date',
      header: ({ column }: { column: Column<Sale, unknown> }) => (
        <DataTableColumnHeader column={column} title='Date' />
      )
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
      id: 'salesperson',
      header: 'SALESPERSON',
      cell: ({ row }) => row.original.salesperson?.name ?? '—'
    },
    {
      accessorKey: 'down_payment_rupees',
      header: 'DOWN PAYMENT',
      cell: ({ cell }) => `Rs. ${cell.getValue<Sale['down_payment_rupees']>()}`
    },
    {
      id: 'items',
      header: 'ITEMS',
      cell: ({ row }) => row.original.installment_plans.length
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<Sale['status']>()}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} onCancel={onCancel} />
    }
  ];
}
