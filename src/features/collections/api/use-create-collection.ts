'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Collection, CreateCollectionRequest } from '@/types/collection';

async function createCollection(
  payload: CreateCollectionRequest
): Promise<Collection> {
  const { data } = await api.post<Collection>('/collections', payload);
  return data;
}

export function useCreateCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections'] });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
      queryClient.invalidateQueries({ queryKey: ['missed-recoveries'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}
