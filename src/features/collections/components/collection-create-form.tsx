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
import { useCreateCollection } from '@/features/collections/api/use-create-collection';
import { useCustomers } from '@/features/customers/api/use-customers';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
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
  customer_id: z.string().min(1, { message: 'Select a customer' }),
  recovery_man_id: z.string().min(1, { message: 'Select a recovery man' }),
  collection_date: z
    .string()
    .min(1, { message: 'Collection date is required' }),
  amount_collected_rupees: z.coerce
    .number()
    .int()
    .min(0, { message: 'Must be 0 or more' }),
  notes: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

export function CollectionCreateForm() {
  const router = useRouter();
  const createMutation = useCreateCollection();
  const { data: customers } = useCustomers({ limit: 100, status: 'active' });
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: '',
      recovery_man_id: '',
      collection_date: today(),
      amount_collected_rupees: 0,
      notes: ''
    }
  });

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    createMutation.mutate(
      {
        customer_id: cleaned.customer_id,
        recovery_man_id: cleaned.recovery_man_id,
        collection_date: cleaned.collection_date,
        amount_collected_rupees: cleaned.amount_collected_rupees,
        notes: cleaned.notes
      },
      {
        onSuccess: (collection) => {
          toast.success('Collection recorded.');
          router.push(`/dashboard/collections/${collection.id}`);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Collection</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='customer_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select
                      disabled={createMutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select customer' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers?.data.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} ({customer.khaata_no})
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
                name='recovery_man_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recovery Man</FormLabel>
                    <Select
                      disabled={createMutation.isPending}
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
                name='collection_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        disabled={createMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='amount_collected_rupees'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount Collected (Rs.)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        disabled={createMutation.isPending}
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
                    <Textarea disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-muted-foreground text-sm'>
              The amount will be automatically allocated across the
              customer&apos;s active installment plans due for collection. Any
              shortfall is recorded as a missed recovery; any surplus is left
              unallocated for you to assign.
            </p>
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={createMutation.isPending}
                onClick={() => router.push('/dashboard/collections')}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending
                  ? 'Recording...'
                  : 'Record Collection'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
