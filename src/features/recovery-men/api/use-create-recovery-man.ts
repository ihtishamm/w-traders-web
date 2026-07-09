'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CreateRecoveryManRequest,
  RecoveryMan
} from '@/types/recovery-man';

async function createRecoveryMan(
  payload: CreateRecoveryManRequest
): Promise<RecoveryMan> {
  const { data } = await api.post<RecoveryMan>('/recovery-men', payload);
  return data;
}

export function useCreateRecoveryMan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRecoveryMan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recovery-men'] });
    }
  });
}
