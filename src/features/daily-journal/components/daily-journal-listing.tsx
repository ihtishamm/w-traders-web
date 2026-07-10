'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useDailyJournalEntries } from '@/features/daily-journal/api/use-daily-journal-entries';
import { useDailyJournalTotals } from '@/features/daily-journal/api/use-daily-journal-totals';
import { DailyJournalEntryFormDialog } from '@/features/daily-journal/components/daily-journal-entry-form-dialog';
import { getDailyJournalColumns } from '@/features/daily-journal/components/daily-journal-tables/columns';
import { DailyJournalTable } from '@/features/daily-journal/components/daily-journal-tables';
import type { DailyJournalEntry } from '@/types/daily-journal';
import { IconPlus } from '@tabler/icons-react';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

export default function DailyJournalListingPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [from, setFrom] = useQueryState('from', parseAsString.withDefault(''));
  const [to, setTo] = useQueryState('to', parseAsString.withDefault(''));

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DailyJournalEntry | null>(null);

  const { data, isLoading } = useDailyJournalEntries({
    page,
    limit: perPage,
    ...(from && { from }),
    ...(to && { to })
  });
  const { data: totals } = useDailyJournalTotals({
    ...(from && { from }),
    ...(to && { to })
  });

  const totalRupees = useMemo(
    () => totals?.reduce((sum, day) => sum + day.total_rupees, 0) ?? 0,
    [totals]
  );

  const columns = useMemo(
    () =>
      getDailyJournalColumns((entry) => {
        setEditing(entry);
        setDialogOpen(true);
      }),
    []
  );

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground text-sm'>
          Total for selected range:{' '}
          <span className='text-foreground font-medium'>Rs. {totalRupees}</span>
        </p>
        <Button
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <IconPlus className='mr-2 h-4 w-4' /> New Entry
        </Button>
      </div>

      {isLoading ? (
        <DataTableSkeleton columnCount={4} rowCount={8} filterCount={0} />
      ) : (
        <DailyJournalTable
          data={data?.data ?? []}
          totalItems={data?.meta.total ?? 0}
          columns={columns}
          toolbarSlot={
            <div className='flex items-center gap-2'>
              <Input
                type='date'
                className='h-8 w-40'
                value={from}
                onChange={(event) => setFrom(event.target.value)}
                placeholder='From'
              />
              <Input
                type='date'
                className='h-8 w-40'
                value={to}
                onChange={(event) => setTo(event.target.value)}
                placeholder='To'
              />
            </div>
          }
        />
      )}

      <DailyJournalEntryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={editing}
      />
    </div>
  );
}
