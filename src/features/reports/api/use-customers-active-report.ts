'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Customer } from '@/types/customer';

interface Params {
  recovery_man_id?: string;
}

export function useCustomersActiveReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'customers', 'active', params],
    queryFn: async () => {
      const { data } = await api.get<Customer[]>('/reports/customers/active', {
        params
      });
      return data;
    }
  });
}
