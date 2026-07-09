'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CreateSalespersonRequest,
  Salesperson
} from '@/types/salesperson';

async function createSalesperson(
  payload: CreateSalespersonRequest
): Promise<Salesperson> {
  const { data } = await api.post<Salesperson>('/salespersons', payload);
  return data;
}

export function useCreateSalesperson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSalesperson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salespersons'] });
    }
  });
}
