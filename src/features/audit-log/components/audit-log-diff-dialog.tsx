'use client';

import { Modal } from '@/components/ui/modal';
import type { AuditLog } from '@/types/audit-log';

interface AuditLogDiffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  auditLog: AuditLog | null;
}

export function AuditLogDiffDialog({
  open,
  onOpenChange,
  auditLog
}: AuditLogDiffDialogProps) {
  return (
    <Modal
      title='Audit Log Detail'
      description={
        auditLog
          ? `${auditLog.entity_type} · ${auditLog.action} · ${new Date(auditLog.created_at).toLocaleString()}`
          : ''
      }
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      {auditLog && (
        <div className='space-y-4'>
          {auditLog.notes && (
            <div>
              <p className='text-muted-foreground text-sm'>Notes</p>
              <p className='text-sm'>{auditLog.notes}</p>
            </div>
          )}
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <p className='text-muted-foreground mb-1 text-sm'>Before</p>
              <pre className='bg-muted max-h-64 overflow-auto rounded-md p-3 text-xs'>
                {auditLog.before
                  ? JSON.stringify(auditLog.before, null, 2)
                  : '—'}
              </pre>
            </div>
            <div>
              <p className='text-muted-foreground mb-1 text-sm'>After</p>
              <pre className='bg-muted max-h-64 overflow-auto rounded-md p-3 text-xs'>
                {auditLog.after ? JSON.stringify(auditLog.after, null, 2) : '—'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
