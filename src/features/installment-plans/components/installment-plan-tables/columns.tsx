'use client';
import { Badge } from '@/components/ui/badge';
import type { InstallmentPlan } from '@/types/installment-plan';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CellAction } from './cell-action';

export function getInstallmentPlanColumns(
  onReassign: (plan: InstallmentPlan) => void,
  onChangeDay: (plan: InstallmentPlan) => void
): ColumnDef<InstallmentPlan>[] {
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
      id: 'recovery_man',
      header: 'RECOVERY MAN',
      cell: ({ row }) => row.original.recovery_man.name
    },
    {
      accessorKey: 'weekly_installment_rupees',
      header: 'WEEKLY INSTALLMENT',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<InstallmentPlan['weekly_installment_rupees']>()}`
    },
    {
      accessorKey: 'remaining_balance_rupees',
      header: 'REMAINING BALANCE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<InstallmentPlan['remaining_balance_rupees']>()}`
    },
    {
      accessorKey: 'installment_type',
      header: 'INSTALLMENT TYPE',
      cell: ({ cell }) => (
        <span className='capitalize'>
          {cell
            .getValue<InstallmentPlan['installment_type']>()
            .replace('_', ' ')}
        </span>
      )
    },
    {
      accessorKey: 'recovery_day',
      header: 'RECOVERY DAY',
      cell: ({ cell }) => (
        <span className='capitalize'>
          {cell.getValue<InstallmentPlan['recovery_day']>() ?? '—'}
        </span>
      )
    },
    {
      accessorKey: 'next_recovery_date',
      header: 'NEXT DUE',
      cell: ({ cell }) =>
        cell.getValue<InstallmentPlan['next_recovery_date']>() ?? '—'
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<InstallmentPlan['status']>().replace('_', ' ')}
        </Badge>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction
          data={row.original}
          onReassign={onReassign}
          onChangeDay={onChangeDay}
        />
      )
    }
  ];
}
