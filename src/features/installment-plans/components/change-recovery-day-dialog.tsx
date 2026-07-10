'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useChangeRecoveryDay } from '@/features/installment-plans/api/use-change-recovery-day';
import {
  RECOVERY_DAY_OPTIONS,
  type InstallmentPlan,
  type RecoveryDay
} from '@/types/installment-plan';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ChangeRecoveryDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: InstallmentPlan | null;
}

export function ChangeRecoveryDayDialog({
  open,
  onOpenChange,
  plan
}: ChangeRecoveryDayDialogProps) {
  const [recoveryDay, setRecoveryDay] = useState<RecoveryDay>('monday');
  const [nextRecoveryDate, setNextRecoveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const changeMutation = useChangeRecoveryDay();

  useEffect(() => {
    if (open && plan) {
      setRecoveryDay(plan.recovery_day ?? 'monday');
      setNextRecoveryDate(plan.next_recovery_date ?? '');
      setNotes('');
    }
  }, [open, plan]);

  const onConfirm = () => {
    if (!plan || !nextRecoveryDate) return;
    changeMutation.mutate(
      {
        id: plan.id,
        payload: {
          recovery_day: recoveryDay,
          next_recovery_date: nextRecoveryDate,
          notes: notes || undefined
        }
      },
      {
        onSuccess: () => {
          toast.success('Recovery day updated.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Change Recovery Day'
      description='Update the weekly collection day and the next expected date.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Recovery Day</Label>
          <Select
            value={recoveryDay}
            onValueChange={(value) => setRecoveryDay(value as RecoveryDay)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RECOVERY_DAY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1'>
          <Label>Next Recovery Date</Label>
          <Input
            type='date'
            value={nextRecoveryDate}
            onChange={(event) => setNextRecoveryDate(event.target.value)}
          />
        </div>
        <div className='space-y-1'>
          <Label>Notes (optional)</Label>
          <Textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            disabled={changeMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            disabled={changeMutation.isPending || !nextRecoveryDate}
            onClick={onConfirm}
          >
            {changeMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
