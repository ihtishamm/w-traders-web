'use client';
import { Badge } from '@/components/ui/badge';
import type { Reconciliation } from '@/types/reconciliation';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export function getReconciliationColumns(): ColumnDef<Reconciliation>[] {
  return [
    {
      id: 'date',
      header: 'DATE',
      cell: ({ row }) => (
        <Link
          href={`/dashboard/reconciliation/${row.original.recovery_man.id}/${row.original.date}`}
          className='font-medium hover:underline'
        >
          {row.original.date}
        </Link>
      )
    },
    {
      id: 'recovery_man',
      header: 'RECOVERY MAN',
      cell: ({ row }) => row.original.recovery_man.name
    },
    {
      accessorKey: 'expected_total_rupees',
      header: 'EXPECTED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Reconciliation['expected_total_rupees']>()}`
    },
    {
      accessorKey: 'collected_total_rupees',
      header: 'COLLECTED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Reconciliation['collected_total_rupees']>()}`
    },
    {
      accessorKey: 'deposited_amount_rupees',
      header: 'DEPOSITED',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Reconciliation['deposited_amount_rupees']>()}`
    },
    {
      accessorKey: 'expense_rupees',
      header: 'EXPENSE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Reconciliation['expense_rupees']>()}`
    },
    {
      accessorKey: 'variance_rupees',
      header: 'VARIANCE',
      cell: ({ cell }) => {
        const variance = cell.getValue<Reconciliation['variance_rupees']>();
        return (
          <Badge variant={variance === 0 ? 'outline' : 'destructive'}>
            Rs. {variance}
          </Badge>
        );
      }
    }
  ];
}
