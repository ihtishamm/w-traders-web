'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SalesBySalespersonRow } from '@/types/report';

interface Params {
  salesperson_id?: string;
  from?: string;
  to?: string;
}

export function useSalesBySalespersonReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'sales', 'by-salesperson', params],
    queryFn: async () => {
      const { data } = await api.get<SalesBySalespersonRow[]>(
        '/reports/sales/by-salesperson',
        { params }
      );
      return data;
    }
  });
}
