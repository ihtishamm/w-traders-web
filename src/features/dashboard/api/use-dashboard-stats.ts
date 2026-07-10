'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { DashboardStats } from '@/types/dashboard';

async function fetchDashboardStats(): Promise<DashboardStats> {
  const { data } = await api.get<DashboardStats>('/dashboard/stats');
  return data;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats
  });
}
