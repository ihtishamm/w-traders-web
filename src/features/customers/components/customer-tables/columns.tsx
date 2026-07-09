'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Customer } from '@/types/customer';
import type { Column, ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export function getCustomerColumns(
  onEdit: (customer: Customer) => void
): ColumnDef<Customer>[] {
  return [
    {
      accessorKey: 'khaata_no',
      header: 'KHAATA NO'
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: { column: Column<Customer, unknown> }) => (
        <DataTableColumnHeader column={column} title='Name' />
      ),
      cell: ({ row }) => (
        <Link
          href={`/dashboard/customers/${row.original.id}`}
          className='font-medium hover:underline'
        >
          {row.original.name}
        </Link>
      )
    },
    {
      accessorKey: 'phone',
      header: 'PHONE',
      cell: ({ cell }) => cell.getValue<Customer['phone']>() ?? '—'
    },
    {
      id: 'recovery_man',
      header: 'RECOVERY MAN',
      cell: ({ row }) => row.original.assigned_recovery_man?.name ?? '—'
    },
    {
      accessorKey: 'active_plans_count',
      header: 'ACTIVE PLANS'
    },
    {
      accessorKey: 'total_outstanding_rupees',
      header: 'OUTSTANDING',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Customer['total_outstanding_rupees']>()}`
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<Customer['status']>()}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} onEdit={onEdit} />
    }
  ];
}
