'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { InstallmentPlan } from '@/types/installment-plan';
import type { ChangeRecoveryDayRequest } from '@/types/installment-plan-requests';

async function changeRecoveryDay({
  id,
  payload
}: {
  id: string;
  payload: ChangeRecoveryDayRequest;
}): Promise<InstallmentPlan> {
  const { data } = await api.patch<InstallmentPlan>(
    `/installment-plans/${id}/recovery-day`,
    payload
  );
  return data;
}

export function useChangeRecoveryDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeRecoveryDay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
