'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { InstallmentPlan } from '@/types/installment-plan';
import type { ReassignRecoveryManRequest } from '@/types/installment-plan-requests';

async function reassignRecoveryMan({
  id,
  payload
}: {
  id: string;
  payload: ReassignRecoveryManRequest;
}): Promise<InstallmentPlan> {
  const { data } = await api.patch<InstallmentPlan>(
    `/installment-plans/${id}/recovery-man`,
    payload
  );
  return data;
}

export function useReassignRecoveryMan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reassignRecoveryMan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
    }
  });
}
