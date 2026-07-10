'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CreateReturnRequest,
  ProductReturn
} from '@/types/product-return';

async function createReturn(
  payload: CreateReturnRequest
): Promise<ProductReturn> {
  const { data } = await api.post<ProductReturn>('/returns', payload);
  return data;
}

export function useCreateReturn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReturn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}
