'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { DailyJournalEntry } from '@/types/daily-journal';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export function getDailyJournalColumns(
  onEdit: (entry: DailyJournalEntry) => void
): ColumnDef<DailyJournalEntry>[] {
  return [
    {
      id: 'entry_date',
      accessorKey: 'entry_date',
      header: ({ column }: { column: Column<DailyJournalEntry, unknown> }) => (
        <DataTableColumnHeader column={column} title='Date' />
      )
    },
    {
      accessorKey: 'amount_rupees',
      header: 'AMOUNT',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<DailyJournalEntry['amount_rupees']>()}`
    },
    {
      accessorKey: 'reason',
      header: 'REASON'
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} onEdit={onEdit} />
    }
  ];
}
