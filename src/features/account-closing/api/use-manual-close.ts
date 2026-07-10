'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  AccountClosing,
  ManualCloseRequest
} from '@/types/account-closing';

async function manualClose(
  payload: ManualCloseRequest
): Promise<AccountClosing> {
  const { data } = await api.post<AccountClosing>(
    '/account-closing/manual',
    payload
  );
  return data;
}

export function useManualClose() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manualClose,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-closings'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });
}
