// Mirrors w-traders-backend src/modules/daily-journal/dtos/*.ts
export interface DailyJournalEntry {
  id: string;
  created_at: string;
  updated_at: string;
  entry_date: string;
  amount_rupees: number;
  reason: string;
}

export interface CreateDailyJournalEntryRequest {
  entry_date: string;
  amount_rupees: number;
  reason: string;
}

export interface UpdateDailyJournalEntryRequest {
  entry_date?: string;
  amount_rupees?: number;
  reason?: string;
}

export interface DailyJournalListParams {
  page?: number;
  limit?: number;
  date?: string;
  from?: string;
  to?: string;
}

export interface DailyJournalDailyTotal {
  date: string;
  total_rupees: number;
}

export interface DailyJournalTotalsParams {
  from?: string;
  to?: string;
}
