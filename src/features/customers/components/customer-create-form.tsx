'use client';

import { FileUploader } from '@/components/file-uploader';
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
import { useCreateCustomer } from '@/features/customers/api/use-create-customer';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { emptyToUndefined } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const UNASSIGNED = '__unassigned__';
const cnicSchema = z
  .string()
  .regex(/^\d{13}$/, { message: 'CNIC must be exactly 13 digits' })
  .optional()
  .or(z.literal(''));

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  khaata_no: z.string().min(1, { message: 'Khaata No. is required' }),
  cnic: cnicSchema,
  phone: z.string().optional(),
  business_address: z.string().optional(),
  residential_address: z.string().optional(),
  assigned_recovery_man_id: z.string().optional(),
  guarantor_name: z.string().min(1, { message: 'Guarantor name is required' }),
  guarantor_cnic: cnicSchema,
  guarantor_phone: z.string().optional(),
  guarantor_address: z.string().optional(),
  guarantor_relationship: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

export function CustomerCreateForm() {
  const router = useRouter();
  const createMutation = useCreateCustomer();
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const [customerPhoto, setCustomerPhoto] = useState<File[]>([]);
  const [cnicPhoto, setCnicPhoto] = useState<File[]>([]);

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      khaata_no: '',
      cnic: '',
      phone: '',
      business_address: '',
      residential_address: '',
      assigned_recovery_man_id: UNASSIGNED,
      guarantor_name: '',
      guarantor_cnic: '',
      guarantor_phone: '',
      guarantor_address: '',
      guarantor_relationship: ''
    }
  });

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    createMutation.mutate(
      {
        ...cleaned,
        name: cleaned.name,
        khaata_no: cleaned.khaata_no,
        guarantor_name: cleaned.guarantor_name,
        assigned_recovery_man_id:
          cleaned.assigned_recovery_man_id === UNASSIGNED
            ? undefined
            : cleaned.assigned_recovery_man_id,
        customer_photo: customerPhoto?.[0],
        cnic_photo: cnicPhoto?.[0]
      },
      {
        onSuccess: (customer) => {
          toast.success('Customer created.');
          router.push(`/dashboard/customers/${customer.id}`);
        }
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='khaata_no'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Khaata No.</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='cnic'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC (13 digits)</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='business_address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Textarea disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='residential_address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Residential Address</FormLabel>
                  <FormControl>
                    <Textarea disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='assigned_recovery_man_id'
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
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UNASSIGNED}>Unassigned</SelectItem>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Photos</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <FormLabel>Customer Photo</FormLabel>
              <FileUploader
                value={customerPhoto}
                onValueChange={setCustomerPhoto}
                accept={{ 'image/jpeg': [], 'image/png': [] }}
                maxSize={5 * 1024 * 1024}
                maxFiles={1}
                disabled={createMutation.isPending}
              />
            </div>
            <div className='space-y-2'>
              <FormLabel>CNIC Photo</FormLabel>
              <FileUploader
                value={cnicPhoto}
                onValueChange={setCnicPhoto}
                accept={{ 'image/jpeg': [], 'image/png': [] }}
                maxSize={5 * 1024 * 1024}
                maxFiles={1}
                disabled={createMutation.isPending}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guarantor Details</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='guarantor_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guarantor_cnic'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNIC (13 digits)</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guarantor_phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guarantor_relationship'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='guarantor_address'
              render={({ field }) => (
                <FormItem className='md:col-span-2'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea disabled={createMutation.isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            disabled={createMutation.isPending}
            onClick={() => router.push('/dashboard/customers')}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creating...' : 'Create Customer'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
