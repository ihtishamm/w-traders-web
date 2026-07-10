'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Page } from '@/types/api';
import type {
  DailyJournalEntry,
  DailyJournalListParams
} from '@/types/daily-journal';

async function fetchDailyJournalEntries(
  params: DailyJournalListParams
): Promise<Page<DailyJournalEntry>> {
  const { data } = await api.get<Page<DailyJournalEntry>>('/daily-journal', {
    params
  });
  return data;
}

export function useDailyJournalEntries(params: DailyJournalListParams) {
  return useQuery({
    queryKey: ['daily-journal', params],
    queryFn: () => fetchDailyJournalEntries(params)
  });
}
