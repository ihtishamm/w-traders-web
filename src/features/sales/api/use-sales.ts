'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { Sale, SaleListParams } from '@/types/sale';

async function fetchSales(params: SaleListParams): Promise<Page<Sale>> {
  const { data } = await api.get<Page<Sale>>('/sales', { params });
  return data;
}

export function useSales(params: SaleListParams) {
  return useQuery({
    queryKey: ['sales', params],
    queryFn: () => fetchSales(params)
  });
}
