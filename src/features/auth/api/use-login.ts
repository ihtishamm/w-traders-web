'use client';

import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { setAuthToken } from '@/lib/auth-cookie';
import { useAuthStore } from '@/store/auth-store';
import type { LoginRequest, LoginResponse } from '@/types/auth';

async function login(payload: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
}

export function useLogin() {
  const setAdmin = useAuthStore((state) => state.setAdmin);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuthToken(data.access_token, data.expires_in);
      setAdmin(data.admin);
    }
  });
}
