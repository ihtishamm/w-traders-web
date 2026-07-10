'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { AccountClosing } from '@/types/account-closing';

async function fetchAccountClosing(
  customerId: string
): Promise<AccountClosing> {
  const { data } = await api.get<AccountClosing>(
    `/account-closing/${customerId}`
  );
  return data;
}

export function useAccountClosing(customerId: string) {
  return useQuery({
    queryKey: ['account-closings', customerId],
    queryFn: () => fetchAccountClosing(customerId),
    enabled: Boolean(customerId)
  });
}
