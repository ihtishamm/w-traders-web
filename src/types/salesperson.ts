// Mirrors w-traders-backend src/modules/salesperson/dtos/*.ts
import type { ActiveStatus } from '@/types/active-status';

export interface Salesperson {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string | null;
  status: ActiveStatus;
}

export interface CreateSalespersonRequest {
  name: string;
  phone?: string;
}

export interface UpdateSalespersonRequest {
  name?: string;
  phone?: string;
  status?: ActiveStatus;
}

export interface SalespersonListParams {
  page?: number;
  limit?: number;
  status?: ActiveStatus;
}
