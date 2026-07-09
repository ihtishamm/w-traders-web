// Mirrors w-traders-backend src/modules/installment-plan/dtos/installment-plan.dto.ts
export const RecoveryDay = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday'
} as const;
export type RecoveryDay = (typeof RecoveryDay)[keyof typeof RecoveryDay];

export const RECOVERY_DAY_OPTIONS = Object.values(RecoveryDay).map((day) => ({
  value: day,
  label: day.charAt(0).toUpperCase() + day.slice(1)
}));

export const PlanStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  RETURNED: 'returned',
  UNDER_REPAIR: 'under_repair',
  REPOSSESSED: 'repossessed'
} as const;
export type PlanStatus = (typeof PlanStatus)[keyof typeof PlanStatus];

export const PLAN_STATUS_OPTIONS = Object.values(PlanStatus).map((status) => ({
  value: status,
  label: status.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())
}));

export interface EntitySummary {
  id: string;
  name: string;
}

export interface InstallmentPlan {
  id: string;
  created_at: string;
  updated_at: string;
  sale_id: string;
  customer: EntitySummary & { khaata_no: string };
  product: EntitySummary;
  recovery_man: EntitySummary;
  quantity: number;
  total_price_rupees: number;
  advance_allocated_rupees: number;
  weekly_installment_rupees: number;
  remaining_balance_rupees: number;
  recovery_day: RecoveryDay;
  next_recovery_date: string | null;
  status: PlanStatus;
}
