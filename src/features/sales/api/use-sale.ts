'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Sale } from '@/types/sale';

async function fetchSale(id: string): Promise<Sale> {
  const { data } = await api.get<Sale>(`/sales/${id}`);
  return data;
}

export function useSale(id: string) {
  return useQuery({
    queryKey: ['sales', id],
    queryFn: () => fetchSale(id),
    enabled: Boolean(id)
  });
}
