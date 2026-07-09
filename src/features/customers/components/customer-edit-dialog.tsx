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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import { useUpdateCustomer } from '@/features/customers/api/use-update-customer';
import { emptyToUndefined } from '@/lib/utils';
import type { Customer } from '@/types/customer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const UNASSIGNED = '__unassigned__';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  business_address: z.string().optional(),
  residential_address: z.string().optional(),
  assigned_recovery_man_id: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

interface CustomerEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
}

export function CustomerEditDialog({
  open,
  onOpenChange,
  customer
}: CustomerEditDialogProps) {
  const updateMutation = useUpdateCustomer();
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      business_address: '',
      residential_address: '',
      assigned_recovery_man_id: UNASSIGNED
    }
  });

  useEffect(() => {
    if (open && customer) {
      form.reset({
        name: customer.name,
        phone: customer.phone ?? '',
        business_address: customer.business_address ?? '',
        residential_address: customer.residential_address ?? '',
        assigned_recovery_man_id:
          customer.assigned_recovery_man?.id ?? UNASSIGNED
      });
    }
  }, [open, customer, form]);

  const onSubmit = (values: FormValue) => {
    if (!customer) return;
    const cleaned = emptyToUndefined(values);

    updateMutation.mutate(
      {
        id: customer.id,
        payload: {
          ...cleaned,
          assigned_recovery_man_id:
            cleaned.assigned_recovery_man_id === UNASSIGNED
              ? undefined
              : cleaned.assigned_recovery_man_id
        }
      },
      {
        onSuccess: () => {
          toast.success('Customer updated.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Edit Customer'
      description='Update this customer’s details.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={updateMutation.isPending} {...field} />
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
                  <Input disabled={updateMutation.isPending} {...field} />
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
                  <Textarea disabled={updateMutation.isPending} {...field} />
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
                  <Textarea disabled={updateMutation.isPending} {...field} />
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
                  disabled={updateMutation.isPending}
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
          <div className='flex justify-end gap-2 pt-2'>
            <Button
              type='button'
              variant='outline'
              disabled={updateMutation.isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
