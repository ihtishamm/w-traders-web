'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { Product, ProductListParams } from '@/types/product';

async function fetchProducts(
  params: ProductListParams
): Promise<Page<Product>> {
  const { data } = await api.get<Page<Product>>('/products', { params });
  return data;
}

export function useProducts(params: ProductListParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params)
  });
}
