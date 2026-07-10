'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  AllocateSurplusRequest,
  AllocateSurplusResponse
} from '@/types/collection';

async function allocateSurplus({
  id,
  payload
}: {
  id: string;
  payload: AllocateSurplusRequest;
}): Promise<AllocateSurplusResponse> {
  const { data } = await api.post<AllocateSurplusResponse>(
    `/collections/${id}/allocate-surplus`,
    payload
  );
  return data;
}

export function useAllocateSurplus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: allocateSurplus,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({
        queryKey: ['collections', variables.id]
      });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
