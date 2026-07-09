'use client';

import { Button } from '@/components/ui/button';
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
import { useReassignRecoveryMan } from '@/features/installment-plans/api/use-reassign-recovery-man';
import { useRecoveryMen } from '@/features/recovery-men/api/use-recovery-men';
import type { InstallmentPlan } from '@/types/installment-plan';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ReassignRecoveryManDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: InstallmentPlan | null;
}

export function ReassignRecoveryManDialog({
  open,
  onOpenChange,
  plan
}: ReassignRecoveryManDialogProps) {
  const [recoveryManId, setRecoveryManId] = useState('');
  const [notes, setNotes] = useState('');
  const { data: recoveryMen } = useRecoveryMen({
    limit: 100,
    status: 'active'
  });
  const reassignMutation = useReassignRecoveryMan();

  useEffect(() => {
    if (open && plan) {
      setRecoveryManId(plan.recovery_man.id);
      setNotes('');
    }
  }, [open, plan]);

  const onConfirm = () => {
    if (!plan || !recoveryManId) return;
    reassignMutation.mutate(
      {
        id: plan.id,
        payload: { recovery_man_id: recoveryManId, notes: notes || undefined }
      },
      {
        onSuccess: () => {
          toast.success('Recovery man reassigned.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Reassign Recovery Man'
      description='Change who collects payments for this installment plan.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Recovery Man</Label>
          <Select value={recoveryManId} onValueChange={setRecoveryManId}>
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {recoveryMen?.data.map((rm) => (
                <SelectItem key={rm.id} value={rm.id}>
                  {rm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            disabled={reassignMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            disabled={reassignMutation.isPending || !recoveryManId}
            onClick={onConfirm}
          >
            {reassignMutation.isPending ? 'Saving...' : 'Reassign'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
