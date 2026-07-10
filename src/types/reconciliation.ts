// Mirrors w-traders-backend src/modules/reconciliation/dtos/*.ts
import type { EntitySummary } from '@/types/installment-plan';

export interface Reconciliation {
  id: string;
  created_at: string;
  updated_at: string;
  recovery_man: EntitySummary;
  date: string;
  expected_total_rupees: number;
  collected_total_rupees: number;
  deposited_amount_rupees: number;
  expense_rupees: number;
  variance_rupees: number;
  notes: string | null;
}

export interface SubmitReconciliationRequest {
  recovery_man_id: string;
  date: string;
  deposited_amount_rupees: number;
  notes?: string;
}

export interface ReconciliationListParams {
  page?: number;
  limit?: number;
  recovery_man_id?: string;
  from?: string;
  to?: string;
  has_variance?: boolean;
}
