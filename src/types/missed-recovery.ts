// Mirrors w-traders-backend src/modules/missed-recovery/dtos/missed-recovery.dto.ts
import type { EntitySummary } from '@/types/installment-plan';

export const MissedStatus = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  WAIVED: 'waived'
} as const;
export type MissedStatus = (typeof MissedStatus)[keyof typeof MissedStatus];

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
