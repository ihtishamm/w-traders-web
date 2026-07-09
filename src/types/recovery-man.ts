// Mirrors w-traders-backend src/modules/recovery-man/dtos/*.ts
import type { ActiveStatus } from '@/types/active-status';

export interface RecoveryMan {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string | null;
  daily_allowance_rupees: number;
  status: ActiveStatus;
}

export interface CreateRecoveryManRequest {
  name: string;
  phone?: string;
  daily_allowance_rupees?: number;
}

export interface UpdateRecoveryManRequest {
  name?: string;
  phone?: string;
  status?: ActiveStatus;
  daily_allowance_rupees?: number;
}

export interface RecoveryManListParams {
  page?: number;
  limit?: number;
  status?: ActiveStatus;
}
