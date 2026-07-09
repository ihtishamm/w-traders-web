'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Customer, CreateCustomerRequest } from '@/types/customer';

async function createCustomer(
  payload: CreateCustomerRequest
): Promise<Customer> {
  const formData = new FormData();

  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    formData.append(key, value instanceof File ? value : String(value));
  }

  const { data } = await api.post<Customer>('/customers', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}
