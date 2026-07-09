'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Guarantor, UpdateGuarantorRequest } from '@/types/guarantor';

async function updateGuarantor({
  id,
  payload
}: {
  id: string;
  payload: UpdateGuarantorRequest;
}): Promise<Guarantor> {
  const { data } = await api.patch<Guarantor>(`/guarantors/${id}`, payload);
  return data;
}

export function useUpdateGuarantor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGuarantor,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['customers', data.customer_id]
      });
    }
  });
}
