'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AuditLog } from '@/types/audit-log';
import type { ColumnDef } from '@tanstack/react-table';

export function getAuditLogColumns(
  onView: (auditLog: AuditLog) => void
): ColumnDef<AuditLog>[] {
  return [
    {
      accessorKey: 'created_at',
      header: 'DATE',
      cell: ({ cell }) =>
        new Date(cell.getValue<AuditLog['created_at']>()).toLocaleString()
    },
    {
      accessorKey: 'actor_name',
      header: 'ACTOR',
      cell: ({ cell }) => cell.getValue<AuditLog['actor_name']>() ?? '—'
    },
    {
      accessorKey: 'entity_type',
      header: 'ENTITY TYPE'
    },
    {
      accessorKey: 'entity_id',
      header: 'ENTITY ID',
      cell: ({ cell }) => (
        <span className='font-mono text-xs'>
          {cell.getValue<AuditLog['entity_id']>().slice(0, 8)}…
        </span>
      )
    },
    {
      accessorKey: 'action',
      header: 'ACTION',
      cell: ({ cell }) => (
        <Badge variant='outline' className='capitalize'>
          {cell.getValue<AuditLog['action']>()}
        </Badge>
      )
    },
    {
      accessorKey: 'notes',
      header: 'NOTES',
      cell: ({ cell }) => cell.getValue<AuditLog['notes']>() ?? '—'
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button variant='ghost' size='sm' onClick={() => onView(row.original)}>
          View
        </Button>
      )
    }
  ];
}
