'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { AccountClosing, ClosingType } from '@/types/account-closing';

interface Params {
  closing_type?: ClosingType;
  from?: string;
  to?: string;
}

export function useCustomersClosedReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'customers', 'closed', params],
    queryFn: async () => {
      const { data } = await api.get<AccountClosing[]>(
        '/reports/customers/closed',
        {
          params
        }
      );
      return data;
    }
  });
}
