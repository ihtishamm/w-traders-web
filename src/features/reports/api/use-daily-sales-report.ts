'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SalesReport } from '@/types/report';

export function useDailySalesReport(date: string) {
  return useQuery({
    queryKey: ['reports', 'sales', 'daily', date],
    queryFn: async () => {
      const { data } = await api.get<SalesReport>('/reports/sales/daily', {
        params: { date }
      });
      return data;
    },
    enabled: Boolean(date)
  });
}
