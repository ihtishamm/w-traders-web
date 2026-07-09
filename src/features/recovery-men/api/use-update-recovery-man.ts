'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  RecoveryMan,
  UpdateRecoveryManRequest
} from '@/types/recovery-man';

async function updateRecoveryMan({
  id,
  payload
}: {
  id: string;
  payload: UpdateRecoveryManRequest;
}): Promise<RecoveryMan> {
  const { data } = await api.patch<RecoveryMan>(`/recovery-men/${id}`, payload);
  return data;
}

export function useUpdateRecoveryMan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecoveryMan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recovery-men'] });
    }
  });
}
