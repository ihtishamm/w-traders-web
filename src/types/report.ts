// Mirrors w-traders-backend src/modules/report/dtos/report-response.dto.ts
import type { EntitySummary } from '@/types/installment-plan';
import type { Product } from '@/types/product';
import type { ProductCondition, ReturnType } from '@/types/product-return';
import type { Sale } from '@/types/sale';

export interface SalesReportTotals {
  sales_count: number;
  total_amount_rupees: number;
  total_down_payment_rupees: number;
}

export interface SalesReport {
  sales: Sale[];
  totals: SalesReportTotals;
}

export interface SalesBySalespersonRow {
  salesperson: EntitySummary | null;
  sales_count: number;
  product_count: number;
  return_count: number;
  total_amount_rupees: number;
}

export interface SalesByProductRow {
  product: EntitySummary;
  units_sold: number;
  units_returned: number;
  total_revenue_rupees: number;
}

export interface RecoveryByManRow {
  recovery_man: EntitySummary;
  customers_assigned: number;
  expected_total_rupees: number;
  collected_total_rupees: number;
  missed_total_rupees: number;
  variance_total_rupees: number;
}

export interface CurrentStockRow {
  product: Product;
  units_under_repair: number;
  units_repossessed: number;
}

export interface SoldInventoryRow {
  id: string;
  product: EntitySummary;
  customer: (EntitySummary & { khaata_no: string }) | null;
  quantity: number;
  sale_id: string | null;
  created_at: string;
}

export interface ReturnedInventoryRow {
  id: string;
  product: EntitySummary;
  return_type: ReturnType;
  condition: ProductCondition | null;
  return_date: string;
  quantity: number;
}

export interface ReturnedInventoryReport {
  rows: ReturnedInventoryRow[];
  by_condition: { new: number; used: number };
  by_type: Partial<Record<ReturnType, number>>;
}

export interface PendingInstallmentCustomerRow {
  customer: EntitySummary & { khaata_no: string };
  total_pending_rupees: number;
}
