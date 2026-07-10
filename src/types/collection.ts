// Mirrors w-traders-backend src/modules/collection/dtos/*.ts
import type { EntitySummary } from '@/types/installment-plan';

export const CollectionStatus = {
  FULL: 'full',
  SHORT: 'short',
  OVER: 'over',
  MISSED: 'missed'
} as const;
export type CollectionStatus =
  (typeof CollectionStatus)[keyof typeof CollectionStatus];

export const COLLECTION_STATUS_OPTIONS = Object.values(CollectionStatus).map(
  (status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1)
  })
);

export interface Allocation {
  id: string;
  created_at: string;
  updated_at: string;
  collection_id: string;
  installment_plan_id: string;
  product_name?: string;
  collection_date?: string;
  amount_applied_rupees: number;
  balance_before_rupees: number;
  balance_after_rupees: number;
}

export interface MissedRecoveryCreated {
  installment_plan_id: string;
  product_name: string;
  amount_due_rupees: number;
  original_due_date: string;
}

export interface Collection {
  id: string;
  created_at: string;
  updated_at: string;
  customer: EntitySummary & { khaata_no: string };
  recovery_man: EntitySummary;
  collection_date: string;
  expected_amount_rupees: number;
  amount_collected_rupees: number;
  unallocated_surplus_rupees: number;
  status: CollectionStatus;
  promised_next_date: string | null;
  notes: string | null;
  allocations: Allocation[];
  missed_recoveries_created: MissedRecoveryCreated[];
}

export interface CreateCollectionRequest {
  customer_id: string;
  recovery_man_id: string;
  collection_date: string;
  amount_collected_rupees: number;
  notes?: string;
}

export interface AllocateSurplusRequest {
  installment_plan_id: string;
  amount_rupees: number;
  notes?: string;
}

export interface AllocateSurplusResponse {
  collection_id: string;
  remaining_unallocated_surplus_rupees: number;
  allocation: {
    installment_plan_id: string;
    amount_applied_rupees: number;
    balance_before_rupees: number;
    balance_after_rupees: number;
  };
}

export interface ReverseCollectionRequest {
  reason: string;
}

export interface CollectionListParams {
  page?: number;
  limit?: number;
  customer_id?: string;
  recovery_man_id?: string;
  date?: string;
  from?: string;
  to?: string;
  status?: CollectionStatus;
}
