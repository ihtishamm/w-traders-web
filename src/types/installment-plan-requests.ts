// Mirrors w-traders-backend src/modules/installment-plan/dtos/*.ts (request DTOs)
import type { PlanStatus, RecoveryDay } from '@/types/installment-plan';

export interface InstallmentPlanListParams {
  page?: number;
  limit?: number;
  customer_id?: string;
  recovery_man_id?: string;
  status?: PlanStatus;
  recovery_day?: RecoveryDay;
}

export interface ReassignRecoveryManRequest {
  recovery_man_id: string;
  notes?: string;
}

export interface ChangeRecoveryDayRequest {
  recovery_day: RecoveryDay;
  next_recovery_date: string;
  notes?: string;
}
