'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';

async function fetchCategories(): Promise<string[]> {
  const { data } = await api.get<{ categories: string[] }>(
    '/products/categories'
  );
  return data.categories;
}

export function useProductCategories() {
  return useQuery({
    queryKey: ['products', 'categories'],
    queryFn: fetchCategories
  });
}
