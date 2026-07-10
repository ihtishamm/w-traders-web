'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useAuditLogs } from '@/features/audit-log/api/use-audit-logs';
import { AuditLogDiffDialog } from '@/features/audit-log/components/audit-log-diff-dialog';
import { getAuditLogColumns } from '@/features/audit-log/components/audit-log-tables/columns';
import { AuditLogTable } from '@/features/audit-log/components/audit-log-tables';
import {
  AUDIT_ACTION_OPTIONS,
  type AuditAction,
  type AuditLog
} from '@/types/audit-log';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

const ALL = '__all__';

export default function AuditLogListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [entityType, setEntityType] = useQueryState(
    'entity_type',
    parseAsString.withDefault('')
  );
  const [action, setAction] = useQueryState(
    'action',
    parseAsString.withDefault('')
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<AuditLog | null>(null);

  const { data, isLoading } = useAuditLogs({
    page,
    limit: perPage,
    ...(entityType && { entity_type: entityType }),
    ...(action && { action: action as AuditAction })
  });

  const columns = useMemo(
    () =>
      getAuditLogColumns((auditLog) => {
        setSelected(auditLog);
        setDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      {isLoading ? (
        <DataTableSkeleton columnCount={7} rowCount={8} filterCount={0} />
      ) : (
        <AuditLogTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-2'>
              <Input
                placeholder='Entity type (e.g. Customer)'
                className='h-8 w-52'
                value={entityType}
                onChange={(event) => setEntityType(event.target.value)}
              />
              <Select
                value={action || ALL}
                onValueChange={(value) => setAction(value === ALL ? '' : value)}
              >
                <SelectTrigger className='h-8 w-36'>
                  <SelectValue placeholder='Action' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Actions</SelectItem>
                  {AUDIT_ACTION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          }
        />
      )}

      <AuditLogDiffDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        auditLog={selected}
      />
    </div>
  );
}
