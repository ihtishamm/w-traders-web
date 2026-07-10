'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { RecoveryByManRow } from '@/types/report';

interface Params {
  recovery_man_id?: string;
  from?: string;
  to?: string;
}

export function useRecoveryByManReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'recovery', 'by-recovery-man', params],
    queryFn: async () => {
      const { data } = await api.get<RecoveryByManRow[]>(
        '/reports/recovery/by-recovery-man',
        { params }
      );
      return data;
    }
  });
}
