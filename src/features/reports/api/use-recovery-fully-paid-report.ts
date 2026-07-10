'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { AccountClosing } from '@/types/account-closing';

interface Params {
  from?: string;
  to?: string;
}

export function useRecoveryFullyPaidReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'recovery', 'fully-paid', params],
    queryFn: async () => {
      const { data } = await api.get<AccountClosing[]>(
        '/reports/recovery/fully-paid',
        {
          params
        }
      );
      return data;
    }
  });
}
