'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { CreateProductRequest, Product } from '@/types/product';

async function createProduct(payload: CreateProductRequest): Promise<Product> {
  const { data } = await api.post<Product>('/products', payload);
  return data;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });
}
