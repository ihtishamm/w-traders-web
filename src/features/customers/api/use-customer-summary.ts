'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { CustomerAccountSummary } from '@/types/customer';

async function fetchCustomerSummary(
  id: string
): Promise<CustomerAccountSummary> {
  const { data } = await api.get<CustomerAccountSummary>(
    `/customers/${id}/summary`
  );
  return data;
}

export function useCustomerSummary(id: string) {
  return useQuery({
    queryKey: ['customers', id, 'summary'],
    queryFn: () => fetchCustomerSummary(id),
    enabled: Boolean(id)
  });
}
