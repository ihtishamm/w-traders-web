'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { CurrentStockRow } from '@/types/report';

export function useCurrentStockReport() {
  return useQuery({
    queryKey: ['reports', 'inventory', 'current-stock'],
    queryFn: async () => {
      const { data } = await api.get<CurrentStockRow[]>(
        '/reports/inventory/current-stock'
      );
      return data;
    }
  });
}
