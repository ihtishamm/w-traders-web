// Mirrors w-traders-backend src/modules/auth/dto/*.ts and
// src/modules/admin/dtos/admin.dto.ts

export interface AdminDto {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  admin: AdminDto;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}
