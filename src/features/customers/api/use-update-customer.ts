'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Customer, UpdateCustomerRequest } from '@/types/customer';

async function updateCustomer({
  id,
  payload
}: {
  id: string;
  payload: UpdateCustomerRequest;
}): Promise<Customer> {
  const { data } = await api.patch<Customer>(`/customers/${id}`, payload);
  return data;
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', variables.id] });
    }
  });
}
