// Mirrors w-traders-backend src/modules/account-closing/dtos/*.ts

export const ClosingType = {
  AUTOMATIC: 'automatic',
  MANUAL: 'manual'
} as const;
export type ClosingType = (typeof ClosingType)[keyof typeof ClosingType];

export interface AccountClosing {
  id: string;
  created_at: string;
  updated_at: string;
  customer?: { id: string; name: string };
  closing_type: ClosingType;
  waived_amount_rupees: number;
  reason: string | null;
  closed_by: string | null;
  closing_date: string;
}

export interface ManualCloseRequest {
  customer_id: string;
  waived_amount_rupees?: number;
  reason: string;
  closed_by: string;
  closing_date: string;
}

export interface AccountClosingListParams {
  page?: number;
  limit?: number;
  closing_type?: ClosingType;
  from?: string;
  to?: string;
}
