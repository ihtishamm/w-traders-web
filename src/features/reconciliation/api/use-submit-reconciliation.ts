'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  Reconciliation,
  SubmitReconciliationRequest
} from '@/types/reconciliation';

async function submitReconciliation(
  payload: SubmitReconciliationRequest
): Promise<Reconciliation> {
  const { data } = await api.post<Reconciliation>('/reconciliation', payload);
  return data;
}

export function useSubmitReconciliation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitReconciliation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reconciliations'] });
    }
  });
}
