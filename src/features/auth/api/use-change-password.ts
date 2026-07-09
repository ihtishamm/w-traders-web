'use client';

import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { ChangePasswordRequest } from '@/types/auth';

async function changePassword(
  payload: ChangePasswordRequest
): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    '/auth/change-password',
    payload
  );
  return data;
}

export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}
