'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { useCreateDailyJournalEntry } from '@/features/daily-journal/api/use-create-daily-journal-entry';
import { useUpdateDailyJournalEntry } from '@/features/daily-journal/api/use-update-daily-journal-entry';
import type { DailyJournalEntry } from '@/types/daily-journal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const formSchema = z.object({
  entry_date: z.string().min(1, { message: 'Date is required' }),
  amount_rupees: z.coerce
    .number()
    .int()
    .positive({ message: 'Must be positive' }),
  reason: z.string().min(1, { message: 'Reason is required' })
});

type FormValue = z.infer<typeof formSchema>;

interface DailyJournalEntryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: DailyJournalEntry | null;
}

export function DailyJournalEntryFormDialog({
  open,
  onOpenChange,
  entry
}: DailyJournalEntryFormDialogProps) {
  const isEdit = Boolean(entry);
  const createMutation = useCreateDailyJournalEntry();
  const updateMutation = useUpdateDailyJournalEntry();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry_date: today(),
      amount_rupees: 0,
      reason: ''
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        entry_date: entry?.entry_date ?? today(),
        amount_rupees: entry?.amount_rupees ?? 0,
        reason: entry?.reason ?? ''
      });
    }
  }, [open, entry, form]);

  const onSubmit = (values: FormValue) => {
    if (isEdit && entry) {
      updateMutation.mutate(
        { id: entry.id, payload: values },
        {
          onSuccess: () => {
            toast.success('Journal entry updated.');
            onOpenChange(false);
          }
        }
      );
      return;
    }

    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Journal entry created.');
        onOpenChange(false);
      }
    });
  };

  return (
    <Modal
      title={isEdit ? 'Edit Journal Entry' : 'New Journal Entry'}
      description={
        isEdit
          ? 'Update this daily journal entry.'
          : 'Record a daily expense or note.'
      }
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='entry_date'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type='date' disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount_rupees'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (Rs.)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    min={0}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='reason'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : isEdit ? 'Save Changes' : 'Create'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
