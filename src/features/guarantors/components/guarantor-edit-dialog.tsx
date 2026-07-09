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
import { useUpdateGuarantor } from '@/features/guarantors/api/use-update-guarantor';
import { emptyToUndefined } from '@/lib/utils';
import type { Guarantor } from '@/types/guarantor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  cnic: z
    .string()
    .regex(/^\d{13}$/, { message: 'CNIC must be exactly 13 digits' })
    .optional()
    .or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  relationship: z.string().optional()
});

type FormValue = z.infer<typeof formSchema>;

interface GuarantorEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guarantor: Guarantor | null;
}

export function GuarantorEditDialog({
  open,
  onOpenChange,
  guarantor
}: GuarantorEditDialogProps) {
  const updateMutation = useUpdateGuarantor();

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cnic: '',
      phone: '',
      address: '',
      relationship: ''
    }
  });

  useEffect(() => {
    if (open && guarantor) {
      form.reset({
        name: guarantor.name,
        cnic: guarantor.cnic ?? '',
        phone: guarantor.phone ?? '',
        address: guarantor.address ?? '',
        relationship: guarantor.relationship ?? ''
      });
    }
  }, [open, guarantor, form]);

  const onSubmit = (values: FormValue) => {
    if (!guarantor) return;
    const cleaned = emptyToUndefined(values);

    updateMutation.mutate(
      { id: guarantor.id, payload: cleaned },
      {
        onSuccess: () => {
          toast.success('Guarantor updated.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Edit Guarantor'
      description='Update this guarantor’s details.'
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
            name='cnic'
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNIC (13 digits)</FormLabel>
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
            name='relationship'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input disabled={updateMutation.isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea disabled={updateMutation.isPending} {...field} />
                </FormControl>
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
