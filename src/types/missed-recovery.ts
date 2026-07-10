// Mirrors w-traders-backend src/modules/missed-recovery/dtos/missed-recovery.dto.ts
import type { EntitySummary } from '@/types/installment-plan';

export const MissedStatus = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  WAIVED: 'waived'
} as const;
export type MissedStatus = (typeof MissedStatus)[keyof typeof MissedStatus];

export const MISSED_STATUS_OPTIONS = Object.values(MissedStatus).map(
  (status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1)
  })
);

export interface MissedRecovery {
  id: string;
  created_at: string;
  updated_at: string;
  installment_plan_id: string;
  customer: EntitySummary & { khaata_no: string };
  product: EntitySummary;
  original_due_date: string;
  promised_date: string | null;
  amount_due_rupees: number;
  status: MissedStatus;
  notes: string | null;
}

export interface UpdatePromisedDateRequest {
  promised_date: string;
  notes?: string;
}

export interface MissedRecoveryListParams {
  page?: number;
  limit?: number;
  recovery_man_id?: string;
  customer_id?: string;
  status?: MissedStatus;
  promised_date?: string;
  from?: string;
  to?: string;
}
