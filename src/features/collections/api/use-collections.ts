'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { Collection, CollectionListParams } from '@/types/collection';

async function fetchCollections(
  params: CollectionListParams
): Promise<Page<Collection>> {
  const { data } = await api.get<Page<Collection>>('/collections', { params });
  return data;
}

export function useCollections(params: CollectionListParams) {
  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => fetchCollections(params)
  });
}
