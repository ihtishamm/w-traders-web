'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type { InstallmentPlan } from '@/types/installment-plan';
import type { InstallmentPlanListParams } from '@/types/installment-plan-requests';

async function fetchInstallmentPlans(
  params: InstallmentPlanListParams
): Promise<Page<InstallmentPlan>> {
  const { data } = await api.get<Page<InstallmentPlan>>('/installment-plans', {
    params
  });
  return data;
}

export function useInstallmentPlans(params: InstallmentPlanListParams) {
  return useQuery({
    queryKey: ['installment-plans', params],
    queryFn: () => fetchInstallmentPlans(params)
  });
}
