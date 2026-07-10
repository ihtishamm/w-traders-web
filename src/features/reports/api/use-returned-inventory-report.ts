'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { ProductCondition, ReturnType } from '@/types/product-return';
import type { ReturnedInventoryReport } from '@/types/report';

interface Params {
  return_type?: ReturnType;
  condition?: ProductCondition;
  from?: string;
  to?: string;
}

export function useReturnedInventoryReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'inventory', 'returned', params],
    queryFn: async () => {
      const { data } = await api.get<ReturnedInventoryReport>(
        '/reports/inventory/returned',
        { params }
      );
      return data;
    }
  });
}
