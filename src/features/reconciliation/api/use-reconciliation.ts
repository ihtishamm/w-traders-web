'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Reconciliation } from '@/types/reconciliation';

async function fetchReconciliation(
  recoveryManId: string,
  date: string
): Promise<Reconciliation> {
  const { data } = await api.get<Reconciliation>(
    `/reconciliation/${recoveryManId}/${date}`
  );
  return data;
}

export function useReconciliation(recoveryManId: string, date: string) {
  return useQuery({
    queryKey: ['reconciliations', recoveryManId, date],
    queryFn: () => fetchReconciliation(recoveryManId, date),
    enabled: Boolean(recoveryManId && date)
  });
}
