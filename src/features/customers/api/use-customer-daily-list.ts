'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CustomerDailyList,
  CustomerDailyListParams
} from '@/types/customer-daily-list';

async function fetchDailyList(
  params: CustomerDailyListParams
): Promise<CustomerDailyList> {
  const { data } = await api.get<CustomerDailyList>('/customers/daily-list', {
    params
  });
  return data;
}

export function useCustomerDailyList(params: CustomerDailyListParams | null) {
  return useQuery({
    queryKey: ['customers', 'daily-list', params],
    queryFn: () => fetchDailyList(params as CustomerDailyListParams),
    enabled: Boolean(params)
  });
}
