'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  CreateDailyJournalEntryRequest,
  DailyJournalEntry
} from '@/types/daily-journal';

async function createDailyJournalEntry(
  payload: CreateDailyJournalEntryRequest
): Promise<DailyJournalEntry> {
  const { data } = await api.post<DailyJournalEntry>('/daily-journal', payload);
  return data;
}

export function useCreateDailyJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDailyJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-journal'] });
      queryClient.invalidateQueries({ queryKey: ['daily-journal-totals'] });
    }
  });
}
