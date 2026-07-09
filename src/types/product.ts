// Mirrors w-traders-backend src/modules/product/dtos/*.ts
import type { ActiveStatus } from '@/types/active-status';

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  code: string | null;
  category: string;
  purchase_price_rupees: number;
  selling_price_rupees: number;
  default_weekly_installment_rupees: number;
  stock_quantity: number;
  status: ActiveStatus;
}

export interface CreateProductRequest {
  name: string;
  code?: string;
  category: string;
  purchase_price_rupees: number;
  selling_price_rupees: number;
  default_weekly_installment_rupees: number;
}

export interface UpdateProductRequest {
  name?: string;
  code?: string;
  category?: string;
  purchase_price_rupees?: number;
  selling_price_rupees?: number;
  default_weekly_installment_rupees?: number;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  status?: ActiveStatus;
  category?: string;
  in_stock?: boolean;
}
