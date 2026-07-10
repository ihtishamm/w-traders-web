'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useSubmitReconciliation } from '@/features/reconciliation/api/use-submit-reconciliation';
import { emptyToUndefined } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const formSchema = z.object({
  recovery_man_id: z.string().min(1, { message: 'Select a recovery man' }),
  date: z.string().min(1, { message: 'Date is required' }),
  deposited_amount_rupees: z.coerce
    .number()
    .int()
    .min(0, { message: 'Must be 0 or more' }),
  notes: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

export function ReconciliationSubmitForm() {
  const router = useRouter();
  const submitMutation = useSubmitReconciliation();
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recovery_man_id: '',
      date: today(),
      deposited_amount_rupees: 0,
      notes: ''
    }
  });

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    submitMutation.mutate(
      {
        recovery_man_id: cleaned.recovery_man_id,
        date: cleaned.date,
        deposited_amount_rupees: cleaned.deposited_amount_rupees,
        notes: cleaned.notes
      },
      {
        onSuccess: (reconciliation) => {
          toast.success('Reconciliation submitted.');
          router.push(
            `/dashboard/reconciliation/${reconciliation.recovery_man.id}/${reconciliation.date}`
          );
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Daily Reconciliation</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='recovery_man_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recovery Man</FormLabel>
                    <Select
                      disabled={submitMutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select recovery man' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {recoveryMen?.data.map((rm) => (
                          <SelectItem key={rm.id} value={rm.id}>
                            {rm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        disabled={submitMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='deposited_amount_rupees'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposited Amount (Rs.)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        disabled={submitMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea disabled={submitMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-muted-foreground text-sm'>
              Expected and collected totals for the day are calculated
              automatically; the difference between the deposited amount and the
              collected total (after expenses) is recorded as the variance.
            </p>
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={submitMutation.isPending}
                onClick={() => router.push('/dashboard/reconciliation')}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={submitMutation.isPending}>
                {submitMutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
