'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SalesReport } from '@/types/report';

export function useMonthlySalesReport(year: number, month: number) {
  return useQuery({
    queryKey: ['reports', 'sales', 'monthly', year, month],
    queryFn: async () => {
      const { data } = await api.get<SalesReport>('/reports/sales/monthly', {
        params: { year, month }
      });
      return data;
    },
    enabled: Boolean(year && month)
  });
}
