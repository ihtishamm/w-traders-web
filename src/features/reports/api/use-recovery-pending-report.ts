'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { InstallmentPlan } from '@/types/installment-plan';

export function useRecoveryPendingReport() {
  return useQuery({
    queryKey: ['reports', 'recovery', 'pending'],
    queryFn: async () => {
      const { data } = await api.get<InstallmentPlan[]>(
        '/reports/recovery/pending'
      );
      return data;
    }
  });
}
