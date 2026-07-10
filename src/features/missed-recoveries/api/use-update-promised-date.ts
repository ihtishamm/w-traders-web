'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  MissedRecovery,
  UpdatePromisedDateRequest
} from '@/types/missed-recovery';

async function updatePromisedDate({
  id,
  payload
}: {
  id: string;
  payload: UpdatePromisedDateRequest;
}): Promise<MissedRecovery> {
  const { data } = await api.patch<MissedRecovery>(
    `/missed-recoveries/${id}/promised-date`,
    payload
  );
  return data;
}

export function useUpdatePromisedDate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePromisedDate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missed-recoveries'] });
    }
  });
}
