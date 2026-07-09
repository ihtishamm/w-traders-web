'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  Salesperson,
  UpdateSalespersonRequest
} from '@/types/salesperson';

async function updateSalesperson({
  id,
  payload
}: {
  id: string;
  payload: UpdateSalespersonRequest;
}): Promise<Salesperson> {
  const { data } = await api.patch<Salesperson>(`/salespersons/${id}`, payload);
  return data;
}

export function useUpdateSalesperson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSalesperson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salespersons'] });
    }
  });
}
