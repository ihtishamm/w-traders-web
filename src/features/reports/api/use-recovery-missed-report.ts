'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MissedRecovery, MissedStatus } from '@/types/missed-recovery';

interface Params {
  recovery_man_id?: string;
  status?: MissedStatus;
  from?: string;
  to?: string;
}

export function useRecoveryMissedReport(params: Params) {
  return useQuery({
    queryKey: ['reports', 'recovery', 'missed', params],
    queryFn: async () => {
      const { data } = await api.get<MissedRecovery[]>(
        '/reports/recovery/missed',
        {
          params
        }
      );
      return data;
    }
  });
}
