'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { useUpdatePromisedDate } from '@/features/missed-recoveries/api/use-update-promised-date';
import type { MissedRecovery } from '@/types/missed-recovery';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UpdatePromisedDateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missedRecovery: MissedRecovery | null;
}

export function UpdatePromisedDateDialog({
  open,
  onOpenChange,
  missedRecovery
}: UpdatePromisedDateDialogProps) {
  const [promisedDate, setPromisedDate] = useState('');
  const [notes, setNotes] = useState('');
  const updateMutation = useUpdatePromisedDate();

  useEffect(() => {
    if (open && missedRecovery) {
      setPromisedDate(missedRecovery.promised_date ?? '');
      setNotes('');
    }
  }, [open, missedRecovery]);

  const onConfirm = () => {
    if (!missedRecovery || !promisedDate) return;
    updateMutation.mutate(
      {
        id: missedRecovery.id,
        payload: { promised_date: promisedDate, notes: notes || undefined }
      },
      {
        onSuccess: () => {
          toast.success('Promised date updated.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Update Promised Date'
      description='Record the date the customer promised to pay.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Promised Date</Label>
          <Input
            type='date'
            value={promisedDate}
            onChange={(event) => setPromisedDate(event.target.value)}
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
            disabled={updateMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            disabled={updateMutation.isPending || !promisedDate}
            onClick={onConfirm}
          >
            {updateMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
