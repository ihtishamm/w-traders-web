// Mirrors w-traders-backend src/modules/customer/dtos/customer-daily-list.dto.ts
import type { EntitySummary } from '@/types/installment-plan';

export interface CustomerDailyListPlan {
  installment_plan_id: string;
  product_name: string;
  weekly_installment_rupees: number;
  remaining_balance_rupees: number;
}

export interface CustomerDailyListEntry {
  customer_id: string;
  khaata_no: string;
  name: string;
  phone: string | null;
  residential_address: string | null;
  plans_due_today: CustomerDailyListPlan[];
  missed_amount_due_rupees: number;
  total_expected_rupees: number;
}

export interface CustomerDailyList {
  date: string;
  day_of_week: string;
  recovery_man: EntitySummary;
  customers: CustomerDailyListEntry[];
  grand_total_expected_rupees: number;
}

export interface CustomerDailyListParams {
  date: string;
  recovery_man_id: string;
}
