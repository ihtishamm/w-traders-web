// Mirrors w-traders-backend src/modules/audit-log/dtos/*.ts
export const AuditAction = {
  CREATE: 'create',
  UPDATE: 'update',
  CLOSE: 'close',
  REASSIGN: 'reassign',
  REVERSE: 'reverse',
  IMPORT: 'import'
} as const;
export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];

export const AUDIT_ACTION_OPTIONS = Object.values(AuditAction).map(
  (action) => ({
    value: action,
    label: action.charAt(0).toUpperCase() + action.slice(1)
  })
);

export interface AuditLog {
  id: string;
  created_at: string;
  updated_at: string;
  actor_id: string | null;
  actor_name: string | null;
  entity_type: string;
  entity_id: string;
  action: AuditAction;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  notes: string | null;
}

export interface AuditLogListParams {
  page?: number;
  limit?: number;
  entity_type?: string;
  entity_id?: string;
  action?: AuditAction;
  from?: string;
  to?: string;
}
