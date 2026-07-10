'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { ProductReturn, ReturnListParams } from '@/types/product-return';

async function fetchReturns(
  params: ReturnListParams
): Promise<Page<ProductReturn>> {
  const { data } = await api.get<Page<ProductReturn>>('/returns', { params });
  return data;
}

export function useReturns(params: ReturnListParams) {
  return useQuery({
    queryKey: ['returns', params],
    queryFn: () => fetchReturns(params)
  });
}
