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
import { useManualClose } from '@/features/account-closing/api/use-manual-close';
import { useCustomers } from '@/features/customers/api/use-customers';
import { emptyToUndefined } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
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
  waived_amount_rupees: z.coerce
    .number()
    .int()
    .min(0)
    .optional()
    .or(z.literal('')),
  reason: z.string().min(1, { message: 'Reason is required' }),
  closed_by: z.string().min(1, { message: 'Closed by is required' }),
  closing_date: z.string().min(1, { message: 'Closing date is required' })
});

type FormValue = z.infer<typeof formSchema>;

export function ManualCloseForm() {
  const router = useRouter();
  const closeMutation = useManualClose();
  const admin = useAuthStore((state) => state.admin);
  const { data: customers } = useCustomers({ limit: 100, status: 'active' });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: '',
      waived_amount_rupees: '',
      reason: '',
      closed_by: admin?.name ?? '',
      closing_date: today()
    }
  });

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    closeMutation.mutate(
      {
        customer_id: cleaned.customer_id,
        waived_amount_rupees: cleaned.waived_amount_rupees,
        reason: cleaned.reason,
        closed_by: cleaned.closed_by,
        closing_date: cleaned.closing_date
      },
      {
        onSuccess: () => {
          toast.success('Account closed.');
          router.push(`/dashboard/account-closing/${cleaned.customer_id}`);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Close Customer Account</CardTitle>
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
                      disabled={closeMutation.isPending}
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
                name='waived_amount_rupees'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waived Amount (Rs., optional)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        disabled={closeMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='closed_by'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closed By</FormLabel>
                    <FormControl>
                      <Input disabled={closeMutation.isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='closing_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        disabled={closeMutation.isPending}
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
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea disabled={closeMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={closeMutation.isPending}
                onClick={() => router.push('/dashboard/account-closing')}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='destructive'
                disabled={closeMutation.isPending}
              >
                {closeMutation.isPending ? 'Closing...' : 'Close Account'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
