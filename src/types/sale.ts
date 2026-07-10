// Mirrors w-traders-backend src/modules/sale/dtos/*.ts
import type {
  EntitySummary,
  InstallmentPlan,
  InstallmentType,
  RecoveryDay
} from '@/types/installment-plan';

export const SaleStatus = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
} as const;
export type SaleStatus = (typeof SaleStatus)[keyof typeof SaleStatus];

export const SaleSource = {
  SALE: 'sale',
  MIGRATION: 'migration'
} as const;
export type SaleSource = (typeof SaleSource)[keyof typeof SaleSource];

export interface Sale {
  id: string;
  created_at: string;
  updated_at: string;
  customer: EntitySummary & { khaata_no: string };
  salesperson: EntitySummary | null;
  sale_date: string;
  down_payment_rupees: number;
  extra_advance_rupees: number;
  status: SaleStatus;
  source: SaleSource;
  installment_plans: InstallmentPlan[];
}

export interface CreateSaleItemRequest {
  product_id: string;
  quantity: number;
  selling_price_rupees: number;
  weekly_installment_rupees: number;
  installment_type: InstallmentType;
  // Required when installment_type is WEEKLY; ignored otherwise.
  recovery_day?: RecoveryDay;
  recovery_man_id: string;
}

export interface CreateSaleRequest {
  customer_id: string;
  salesperson_id?: string;
  sale_date: string;
  down_payment_rupees?: number;
  extra_advance_rupees?: number;
  items: CreateSaleItemRequest[];
}

export interface CancelSaleRequest {
  notes?: string;
}

export interface SaleListParams {
  page?: number;
  limit?: number;
  customer_id?: string;
  salesperson_id?: string;
  status?: SaleStatus;
  from?: string;
  to?: string;
}
