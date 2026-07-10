'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type {
  AccountClosing,
  AccountClosingListParams
} from '@/types/account-closing';

async function fetchAccountClosings(
  params: AccountClosingListParams
): Promise<Page<AccountClosing>> {
  const { data } = await api.get<Page<AccountClosing>>('/account-closing', {
    params
  });
  return data;
}

export function useAccountClosings(params: AccountClosingListParams) {
  return useQuery({
    queryKey: ['account-closings', params],
    queryFn: () => fetchAccountClosings(params)
  });
}
