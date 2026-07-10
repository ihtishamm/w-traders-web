'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Collection, ReverseCollectionRequest } from '@/types/collection';

async function reverseCollection({
  id,
  payload
}: {
  id: string;
  payload: ReverseCollectionRequest;
}): Promise<Collection> {
  const { data } = await api.post<Collection>(
    `/collections/${id}/reverse`,
    payload
  );
  return data;
}

export function useReverseCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reverseCollection,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({
        queryKey: ['collections', variables.id]
      });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
