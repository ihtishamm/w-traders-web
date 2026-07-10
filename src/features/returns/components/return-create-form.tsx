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
import { useInstallmentPlans } from '@/features/installment-plans/api/use-installment-plans';
import { useCreateReturn } from '@/features/returns/api/use-create-return';
import { emptyToUndefined } from '@/lib/utils';
import {
  PRODUCT_CONDITION_OPTIONS,
  RETURN_TYPE_OPTIONS,
  type ProductCondition
} from '@/types/product-return';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const NO_CONDITION = '__none__';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const formSchema = z.object({
  installment_plan_id: z
    .string()
    .min(1, { message: 'Select an installment plan' }),
  return_type: z.enum(['customer_return', 'repair', 'repossession']),
  condition: z.string().optional(),
  return_date: z.string().min(1, { message: 'Return date is required' }),
  notes: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

export function ReturnCreateForm() {
  const router = useRouter();
  const createMutation = useCreateReturn();
  const { data: plans } = useInstallmentPlans({ status: 'active', limit: 100 });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      installment_plan_id: '',
      return_type: 'customer_return',
      condition: NO_CONDITION,
      return_date: today(),
      notes: ''
    }
  });

  const returnType = form.watch('return_type');
  const isRepair = returnType === 'repair';

  // The backend rejects a repair return that has a condition set.
  useEffect(() => {
    if (isRepair) {
      form.setValue('condition', NO_CONDITION);
    }
  }, [isRepair, form]);

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    createMutation.mutate(
      {
        installment_plan_id: cleaned.installment_plan_id,
        return_type: cleaned.return_type,
        condition:
          cleaned.return_type === 'repair' || cleaned.condition === NO_CONDITION
            ? undefined
            : (cleaned.condition as ProductCondition),
        return_date: cleaned.return_date,
        notes: cleaned.notes
      },
      {
        onSuccess: () => {
          toast.success('Return recorded.');
          router.push('/dashboard/returns');
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Return</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='installment_plan_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Installment Plan</FormLabel>
                  <Select
                    disabled={createMutation.isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select installment plan' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {plans?.data.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.customer.name} — {plan.product.name} (Rs.{' '}
                          {plan.remaining_balance_rupees} remaining)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid gap-4 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='return_type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Type</FormLabel>
                    <Select
                      disabled={createMutation.isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RETURN_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isRepair && (
                <FormField
                  control={form.control}
                  name='condition'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition (optional)</FormLabel>
                      <Select
                        disabled={createMutation.isPending}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full'>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={NO_CONDITION}>
                            Unspecified
                          </SelectItem>
                          {PRODUCT_CONDITION_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='return_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Return Date</FormLabel>
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
            <div className='flex justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                disabled={createMutation.isPending}
                onClick={() => router.push('/dashboard/returns')}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Recording...' : 'Record Return'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
