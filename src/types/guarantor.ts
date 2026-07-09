// Mirrors w-traders-backend src/modules/guarantor/dtos/*.ts
export interface Guarantor {
  id: string;
  created_at: string;
  updated_at: string;
  customer_id: string;
  name: string;
  cnic: string | null;
  phone: string | null;
  address: string | null;
  relationship: string | null;
}

export interface UpdateGuarantorRequest {
  name?: string;
  cnic?: string;
  phone?: string;
  address?: string;
  relationship?: string;
}
