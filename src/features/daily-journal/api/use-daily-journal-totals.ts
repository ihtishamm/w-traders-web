'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type {
  DailyJournalDailyTotal,
  DailyJournalTotalsParams
} from '@/types/daily-journal';

async function fetchDailyJournalTotals(
  params: DailyJournalTotalsParams
): Promise<DailyJournalDailyTotal[]> {
  const { data } = await api.get<DailyJournalDailyTotal[]>(
    '/daily-journal/totals',
    { params }
  );
  return data;
}

export function useDailyJournalTotals(params: DailyJournalTotalsParams) {
  return useQuery({
    queryKey: ['daily-journal-totals', params],
    queryFn: () => fetchDailyJournalTotals(params)
  });
}
