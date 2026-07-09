'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { Customer, CustomerListParams } from '@/types/customer';

async function fetchCustomers(
  params: CustomerListParams
): Promise<Page<Customer>> {
  const { data } = await api.get<Page<Customer>>('/customers', { params });
  return data;
}

export function useCustomers(params: CustomerListParams) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params)
  });
}
