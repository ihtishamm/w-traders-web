'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { RecoveryMan, RecoveryManListParams } from '@/types/recovery-man';

async function fetchRecoveryMen(
  params: RecoveryManListParams
): Promise<Page<RecoveryMan>> {
  const { data } = await api.get<Page<RecoveryMan>>('/recovery-men', {
    params
  });
  return data;
}

export function useRecoveryMen(params: RecoveryManListParams) {
  return useQuery({
    queryKey: ['recovery-men', params],
    queryFn: () => fetchRecoveryMen(params)
  });
}
