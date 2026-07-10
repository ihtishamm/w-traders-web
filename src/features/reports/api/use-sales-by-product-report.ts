'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SalesByProductRow } from '@/types/report';

interface Params {
  product_id?: string;
  from?: string;
  to?: string;
}

export function useSalesByProductReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'sales', 'by-product', params],
    queryFn: async () => {
      const { data } = await api.get<SalesByProductRow[]>(
        '/reports/sales/by-product',
        {
          params
        }
      );
      return data;
    }
  });
}
