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
import { useCreateSale } from '@/features/sales/api/use-create-sale';
import { useCustomers } from '@/features/customers/api/use-customers';
import { useProducts } from '@/features/products/api/use-products';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useSalespersons } from '@/features/salespersons/api/use-salespersons';
import { emptyToUndefined } from '@/lib/utils';
import { RECOVERY_DAY_OPTIONS } from '@/types/installment-plan';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const NO_SALESPERSON = '__none__';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const itemSchema = z.object({
  product_id: z.string().min(1, { message: 'Select a product' }),
  quantity: z.coerce.number().int().positive({ message: 'Must be positive' }),
  selling_price_rupees: z.coerce
    .number()
    .int()
    .positive({ message: 'Must be positive' }),
  weekly_installment_rupees: z.coerce
    .number()
    .int()
    .positive({ message: 'Must be positive' }),
  recovery_day: z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ]),
  recovery_man_id: z.string().min(1, { message: 'Select a recovery man' })
});

const formSchema = z.object({
  customer_id: z.string().min(1, { message: 'Select a customer' }),
  salesperson_id: z.string().optional(),
  sale_date: z.string().min(1, { message: 'Sale date is required' }),
  down_payment_rupees: z.coerce
    .number()
    .int()
    .min(0)
    .optional()
    .or(z.literal('')),
  extra_advance_rupees: z.coerce
    .number()
    .int()
    .min(0)
    .optional()
    .or(z.literal('')),
  items: z.array(itemSchema).min(1, { message: 'Add at least one item' })
});

type FormValue = z.infer<typeof formSchema>;

export function SaleCreateForm() {
  const router = useRouter();
  const createMutation = useCreateSale();

  const { data: customers } = useCustomers({ limit: 100, status: 'active' });
  const { data: salespersons } = useSalespersons({
    limit: 100,
    status: 'active'
  });
  const { data: products } = useProducts({ limit: 100, status: 'active' });
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: '',
      salesperson_id: NO_SALESPERSON,
      sale_date: today(),
      down_payment_rupees: '',
      extra_advance_rupees: '',
      items: [
        {
          product_id: '',
          quantity: 1,
          selling_price_rupees: 0,
          weekly_installment_rupees: 0,
          recovery_day: 'monday',
          recovery_man_id: ''
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const onProductChange = (index: number, productId: string) => {
    const product = products?.data.find((p) => p.id === productId);
    if (product) {
      form.setValue(
        `items.${index}.selling_price_rupees`,
        product.selling_price_rupees
      );
      form.setValue(
        `items.${index}.weekly_installment_rupees`,
        product.default_weekly_installment_rupees
      );
    }
  };

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    createMutation.mutate(
      {
        customer_id: cleaned.customer_id,
        salesperson_id:
          cleaned.salesperson_id === NO_SALESPERSON
            ? undefined
            : cleaned.salesperson_id,
        sale_date: cleaned.sale_date,
        down_payment_rupees: cleaned.down_payment_rupees,
        extra_advance_rupees: cleaned.extra_advance_rupees,
        items: cleaned.items
      },
      {
        onSuccess: (sale) => {
          toast.success('Sale created.');
          router.push(`/dashboard/sales/${sale.id}`);
        }
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Sale Details</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
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
              name='salesperson_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salesperson</FormLabel>
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
                      <SelectItem value={NO_SALESPERSON}>None</SelectItem>
                      {salespersons?.data.map((sp) => (
                        <SelectItem key={sp.id} value={sp.id}>
                          {sp.name}
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
              name='sale_date'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Date</FormLabel>
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
            <div />
            <FormField
              control={form.control}
              name='down_payment_rupees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Down Payment (Rs.)</FormLabel>
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
            <FormField
              control={form.control}
              name='extra_advance_rupees'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Advance (Rs.)</FormLabel>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            {fields.map((field, index) => (
              <div key={field.id} className='space-y-4 rounded-lg border p-4'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>Item {index + 1}</p>
                  {fields.length > 1 && (
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => remove(index)}
                      disabled={createMutation.isPending}
                    >
                      <IconTrash className='h-4 w-4' />
                    </Button>
                  )}
                </div>
                <div className='grid gap-4 md:grid-cols-3'>
                  <FormField
                    control={form.control}
                    name={`items.${index}.product_id`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <Select
                          disabled={createMutation.isPending}
                          onValueChange={(value) => {
                            itemField.onChange(value);
                            onProductChange(index, value);
                          }}
                          value={itemField.value}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select product' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {products?.data.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
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
                    name={`items.${index}.quantity`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={1}
                            disabled={createMutation.isPending}
                            {...itemField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.recovery_man_id`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Recovery Man</FormLabel>
                        <Select
                          disabled={createMutation.isPending}
                          onValueChange={itemField.onChange}
                          value={itemField.value}
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
                    name={`items.${index}.selling_price_rupees`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Selling Price (Rs.)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={0}
                            disabled={createMutation.isPending}
                            {...itemField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.weekly_installment_rupees`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Weekly Installment (Rs.)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min={0}
                            disabled={createMutation.isPending}
                            {...itemField}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`items.${index}.recovery_day`}
                    render={({ field: itemField }) => (
                      <FormItem>
                        <FormLabel>Recovery Day</FormLabel>
                        <Select
                          disabled={createMutation.isPending}
                          onValueChange={itemField.onChange}
                          value={itemField.value}
                        >
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RECOVERY_DAY_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              disabled={createMutation.isPending}
              onClick={() =>
                append({
                  product_id: '',
                  quantity: 1,
                  selling_price_rupees: 0,
                  weekly_installment_rupees: 0,
                  recovery_day: 'monday',
                  recovery_man_id: ''
                })
              }
            >
              <IconPlus className='mr-2 h-4 w-4' /> Add Item
            </Button>
          </CardContent>
        </Card>

        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            disabled={createMutation.isPending}
            onClick={() => router.push('/dashboard/sales')}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creating...' : 'Create Sale'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
