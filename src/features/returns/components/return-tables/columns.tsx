'use client';
import { Badge } from '@/components/ui/badge';
import type { ProductReturn } from '@/types/product-return';
import type { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export interface PlanLookupEntry {
  customerName: string;
  productName: string;
}

export function getReturnColumns(
  planLookup: Record<string, PlanLookupEntry>,
  onCompleteRepair: (productReturn: ProductReturn) => void
): ColumnDef<ProductReturn>[] {
  return [
    {
      id: 'customer',
      header: 'CUSTOMER',
      cell: ({ row }) =>
        planLookup[row.original.installment_plan_id]?.customerName ?? '—'
    },
    {
      id: 'product',
      header: 'PRODUCT',
      cell: ({ row }) =>
        planLookup[row.original.installment_plan_id]?.productName ?? '—'
    },
    {
      accessorKey: 'return_type',
      header: 'RETURN TYPE',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<ProductReturn['return_type']>().replace('_', ' ')}
        </Badge>
      )
    },
    {
      accessorKey: 'condition',
      header: 'CONDITION',
      cell: ({ cell }) => cell.getValue<ProductReturn['condition']>() ?? '—'
    },
    {
      accessorKey: 'return_date',
      header: 'RETURN DATE'
    },
    {
      accessorKey: 'unpaid_balance_rupees',
      header: 'UNPAID BALANCE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<ProductReturn['unpaid_balance_rupees']>()}`
    },
    {
      accessorKey: 'plan_status_after',
      header: 'PLAN STATUS',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell
            .getValue<ProductReturn['plan_status_after']>()
            .replace('_', ' ')}
        </Badge>
      )
    },
    {
      accessorKey: 'repaired_return_date',
      header: 'REPAIRED RETURN',
      cell: ({ cell }) =>
        cell.getValue<ProductReturn['repaired_return_date']>() ?? '—'
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <CellAction data={row.original} onCompleteRepair={onCompleteRepair} />
      )
    }
  ];
}
