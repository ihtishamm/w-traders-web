'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type {
  MissedRecovery,
  MissedRecoveryListParams
} from '@/types/missed-recovery';

async function fetchMissedRecoveries(
  params: MissedRecoveryListParams
): Promise<Page<MissedRecovery>> {
  const { data } = await api.get<Page<MissedRecovery>>('/missed-recoveries', {
    params
  });
  return data;
}

export function useMissedRecoveries(params: MissedRecoveryListParams) {
  return useQuery({
    queryKey: ['missed-recoveries', params],
    queryFn: () => fetchMissedRecoveries(params)
  });
}
