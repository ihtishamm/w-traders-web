// Mirrors w-traders-backend src/modules/customer/dtos/*.ts
import type { InstallmentPlan } from '@/types/installment-plan';
import type { MissedRecovery } from '@/types/missed-recovery';
import type { CustomerStatus } from '@/types/customer-status';
import type { Guarantor } from '@/types/guarantor';

export interface AssignedRecoveryMan {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  created_at: string;
  updated_at: string;
  khaata_no: string;
  name: string;
  cnic: string | null;
  phone: string | null;
  business_address: string | null;
  residential_address: string | null;
  customer_photo_url: string | null;
  cnic_photo_url: string | null;
  status: CustomerStatus;
  assigned_recovery_man?: AssignedRecoveryMan | null;
  guarantor?: Guarantor;
  active_plans_count?: number;
  total_outstanding_rupees?: number;
}

export interface CreateCustomerRequest {
  name: string;
  khaata_no: string;
  cnic?: string;
  phone?: string;
  business_address?: string;
  residential_address?: string;
  assigned_recovery_man_id?: string;
  guarantor_name: string;
  guarantor_cnic?: string;
  guarantor_phone?: string;
  guarantor_address?: string;
  guarantor_relationship?: string;
  customer_photo?: File;
  cnic_photo?: File;
}

export interface UpdateCustomerRequest {
  name?: string;
  phone?: string;
  business_address?: string;
  residential_address?: string;
  assigned_recovery_man_id?: string;
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  status?: CustomerStatus;
  recovery_man_id?: string;
  search?: string;
}

export interface CustomerAccountSummary {
  customer: Customer;
  installment_plans: InstallmentPlan[];
  missed_recoveries: MissedRecovery[];
  total_outstanding_rupees: number;
}
