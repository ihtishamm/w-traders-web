'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type {
  Reconciliation,
  ReconciliationListParams
} from '@/types/reconciliation';

async function fetchReconciliations(
  params: ReconciliationListParams
): Promise<Page<Reconciliation>> {
  const { data } = await api.get<Page<Reconciliation>>('/reconciliation', {
    params
  });
  return data;
}

export function useReconciliations(params: ReconciliationListParams) {
  return useQuery({
    queryKey: ['reconciliations', params],
    queryFn: () => fetchReconciliations(params)
  });
}
