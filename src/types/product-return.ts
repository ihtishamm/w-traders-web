// Mirrors w-traders-backend src/modules/product-return/dtos/*.ts
import type { PlanStatus } from '@/types/installment-plan';

export const ReturnType = {
  CUSTOMER_RETURN: 'customer_return',
  REPAIR: 'repair',
  REPOSSESSION: 'repossession'
} as const;
export type ReturnType = (typeof ReturnType)[keyof typeof ReturnType];

export const RETURN_TYPE_OPTIONS = Object.values(ReturnType).map((type) => ({
  value: type,
  label: type.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())
}));

export const ProductCondition = {
  NEW: 'new',
  USED: 'used'
} as const;
export type ProductCondition =
  (typeof ProductCondition)[keyof typeof ProductCondition];

export const PRODUCT_CONDITION_OPTIONS = Object.values(ProductCondition).map(
  (c) => ({
    value: c,
    label: c.charAt(0).toUpperCase() + c.slice(1)
  })
);

export interface InventoryMovement {
  id: string;
  created_at: string;
  updated_at: string;
  product_id: string;
  movement_type: string;
  quantity: number;
  condition: ProductCondition | null;
  reference_id: string | null;
  reference_type: string | null;
  notes: string | null;
}

export interface ProductReturn {
  id: string;
  created_at: string;
  updated_at: string;
  installment_plan_id: string;
  return_type: ReturnType;
  condition: ProductCondition | null;
  return_date: string;
  unpaid_balance_rupees: number;
  notes: string | null;
  plan_status_after: PlanStatus;
  inventory_movement?: InventoryMovement;
  repaired_return_date: string | null;
}

export interface CreateReturnRequest {
  installment_plan_id: string;
  return_type: ReturnType;
  condition?: ProductCondition;
  return_date: string;
  notes?: string;
}

export interface CompleteRepairRequest {
  repaired_return_date: string;
  notes?: string;
}

export interface ReturnListParams {
  page?: number;
  limit?: number;
  return_type?: ReturnType;
  customer_id?: string;
  from?: string;
  to?: string;
}
