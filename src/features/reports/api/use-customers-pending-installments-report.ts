'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { PendingInstallmentCustomerRow } from '@/types/report';

export function useCustomersPendingInstallmentsReport() {
  return useQuery({
    queryKey: ['reports', 'customers', 'pending-installments'],
    queryFn: async () => {
      const { data } = await api.get<PendingInstallmentCustomerRow[]>(
        '/reports/customers/pending-installments'
      );
      return data;
    }
  });
}
