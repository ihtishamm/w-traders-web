'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SoldInventoryRow } from '@/types/report';

interface Params {
  from?: string;
  to?: string;
}

export function useSoldInventoryReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'inventory', 'sold', params],
    queryFn: async () => {
      const { data } = await api.get<SoldInventoryRow[]>(
        '/reports/inventory/sold',
        {
          params
        }
      );
      return data;
    }
  });
}
