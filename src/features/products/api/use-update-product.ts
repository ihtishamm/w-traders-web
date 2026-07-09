'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Product, UpdateProductRequest } from '@/types/product';

async function updateProduct({
  id,
  payload
}: {
  id: string;
  payload: UpdateProductRequest;
}): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}`, payload);
  return data;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}
