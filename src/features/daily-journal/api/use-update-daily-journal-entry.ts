'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  DailyJournalEntry,
  UpdateDailyJournalEntryRequest
} from '@/types/daily-journal';

async function updateDailyJournalEntry({
  id,
  payload
}: {
  id: string;
  payload: UpdateDailyJournalEntryRequest;
}): Promise<DailyJournalEntry> {
  const { data } = await api.patch<DailyJournalEntry>(
    `/daily-journal/${id}`,
    payload
  );
  return data;
}

export function useUpdateDailyJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDailyJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-journal'] });
      queryClient.invalidateQueries({ queryKey: ['daily-journal-totals'] });
    }
  });
}
