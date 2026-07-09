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
import { useCreateSalesperson } from '@/features/salespersons/api/use-create-salesperson';
import { useUpdateSalesperson } from '@/features/salespersons/api/use-update-salesperson';
import { emptyToUndefined } from '@/lib/utils';
import { ACTIVE_STATUS_OPTIONS } from '@/types/active-status';
import type { Salesperson } from '@/types/salesperson';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional()
});

type FormValue = z.infer<typeof formSchema>;

interface SalespersonFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salesperson?: Salesperson | null;
}

export function SalespersonFormDialog({
  open,
  onOpenChange,
  salesperson
}: SalespersonFormDialogProps) {
  const isEdit = Boolean(salesperson);
  const createMutation = useCreateSalesperson();
  const updateMutation = useUpdateSalesperson();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', status: 'active' }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: salesperson?.name ?? '',
        phone: salesperson?.phone ?? '',
        status: salesperson?.status ?? 'active'
      });
    }
  }, [open, salesperson, form]);

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    if (isEdit && salesperson) {
      updateMutation.mutate(
        { id: salesperson.id, payload: cleaned },
        {
          onSuccess: () => {
            toast.success('Salesperson updated.');
            onOpenChange(false);
          }
        }
      );
      return;
    }

    createMutation.mutate(
      { name: cleaned.name, phone: cleaned.phone },
      {
        onSuccess: () => {
          toast.success('Salesperson created.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title={isEdit ? 'Edit Salesperson' : 'New Salesperson'}
      description={
        isEdit ? 'Update this salesperson’s details.' : 'Add a new salesperson.'
      }
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
                  <Input disabled={isPending} {...field} />
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
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEdit && (
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACTIVE_STATUS_OPTIONS.map((option) => (
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
