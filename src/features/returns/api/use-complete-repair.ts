'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CompleteRepairRequest,
  ProductReturn
} from '@/types/product-return';

async function completeRepair({
  id,
  payload
}: {
  id: string;
  payload: CompleteRepairRequest;
}): Promise<ProductReturn> {
  const { data } = await api.patch<ProductReturn>(
    `/returns/${id}/repair-completed`,
    payload
  );
  return data;
}

export function useCompleteRepair() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeRepair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returns'] });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
