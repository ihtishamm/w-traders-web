'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { RecoveryMan } from '@/types/recovery-man';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';

export function getRecoveryManColumns(
  onEdit: (recoveryMan: RecoveryMan) => void
): ColumnDef<RecoveryMan>[] {
  return [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: { column: Column<RecoveryMan, unknown> }) => (
        <DataTableColumnHeader column={column} title='Name' />
      )
    },
    {
      accessorKey: 'phone',
      header: 'PHONE',
      cell: ({ cell }) => cell.getValue<RecoveryMan['phone']>() ?? '—'
    },
    {
      accessorKey: 'daily_allowance_rupees',
      header: 'DAILY ALLOWANCE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<RecoveryMan['daily_allowance_rupees']>()}`
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => {
        const status = cell.getValue<RecoveryMan['status']>();
        const Icon = status === 'active' ? CheckCircle2 : XCircle;
        return (
          <Badge variant='outline' className='capitalize'>
            <Icon className='mr-1 h-3 w-3' />
            {status}
          </Badge>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} onEdit={onEdit} />
    }
  ];
}
