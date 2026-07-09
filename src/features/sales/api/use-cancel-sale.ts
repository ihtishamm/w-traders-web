'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { CancelSaleRequest, Sale } from '@/types/sale';

async function cancelSale({
  id,
  payload
}: {
  id: string;
  payload: CancelSaleRequest;
}): Promise<Sale> {
  const { data } = await api.patch<Sale>(`/sales/${id}/cancel`, payload);
  return data;
}

export function useCancelSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSale,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sales', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
