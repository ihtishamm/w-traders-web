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
import { useCreateRecoveryMan } from '@/features/recovery-men/api/use-create-recovery-man';
import { useUpdateRecoveryMan } from '@/features/recovery-men/api/use-update-recovery-man';
import { emptyToUndefined } from '@/lib/utils';
import { ACTIVE_STATUS_OPTIONS } from '@/types/active-status';
import type { RecoveryMan } from '@/types/recovery-man';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  phone: z.string().optional(),
  daily_allowance_rupees: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal('')),
  status: z.enum(['active', 'inactive']).optional()
});

type FormValue = z.infer<typeof formSchema>;

interface RecoveryManFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recoveryMan?: RecoveryMan | null;
}

export function RecoveryManFormDialog({
  open,
  onOpenChange,
  recoveryMan
}: RecoveryManFormDialogProps) {
  const isEdit = Boolean(recoveryMan);
  const createMutation = useCreateRecoveryMan();
  const updateMutation = useUpdateRecoveryMan();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      daily_allowance_rupees: '',
      status: 'active'
    }
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: recoveryMan?.name ?? '',
        phone: recoveryMan?.phone ?? '',
        daily_allowance_rupees: recoveryMan?.daily_allowance_rupees ?? '',
        status: recoveryMan?.status ?? 'active'
      });
    }
  }, [open, recoveryMan, form]);

  const onSubmit = (values: FormValue) => {
    const cleaned = emptyToUndefined(values);

    if (isEdit && recoveryMan) {
      updateMutation.mutate(
        { id: recoveryMan.id, payload: cleaned },
        {
          onSuccess: () => {
            toast.success('Recovery man updated.');
            onOpenChange(false);
          }
        }
      );
      return;
    }

    createMutation.mutate(
      {
        name: cleaned.name,
        phone: cleaned.phone,
        daily_allowance_rupees: cleaned.daily_allowance_rupees
      },
      {
        onSuccess: () => {
          toast.success('Recovery man created.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title={isEdit ? 'Edit Recovery Man' : 'New Recovery Man'}
      description={
        isEdit
          ? 'Update this recovery man’s details.'
          : 'Add a new recovery man.'
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
          <FormField
            control={form.control}
            name='daily_allowance_rupees'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Allowance (Rs.)</FormLabel>
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
