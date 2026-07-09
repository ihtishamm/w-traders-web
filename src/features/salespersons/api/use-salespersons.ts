'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { Salesperson, SalespersonListParams } from '@/types/salesperson';

async function fetchSalespersons(
  params: SalespersonListParams
): Promise<Page<Salesperson>> {
  const { data } = await api.get<Page<Salesperson>>('/salespersons', {
    params
  });
  return data;
}

export function useSalespersons(params: SalespersonListParams) {
  return useQuery({
    queryKey: ['salespersons', params],
    queryFn: () => fetchSalespersons(params)
  });
}
