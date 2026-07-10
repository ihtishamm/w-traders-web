'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Collection } from '@/types/collection';

async function fetchCollection(id: string): Promise<Collection> {
  const { data } = await api.get<Collection>(`/collections/${id}`);
  return data;
}

export function useCollection(id: string) {
  return useQuery({
    queryKey: ['collections', id],
    queryFn: () => fetchCollection(id),
    enabled: Boolean(id)
  });
}
