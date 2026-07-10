'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { useCompleteRepair } from '@/features/returns/api/use-complete-repair';
import type { ProductReturn } from '@/types/product-return';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

interface CompleteRepairDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productReturn: ProductReturn | null;
}

export function CompleteRepairDialog({
  open,
  onOpenChange,
  productReturn
}: CompleteRepairDialogProps) {
  const [repairedDate, setRepairedDate] = useState(today());
  const [notes, setNotes] = useState('');
  const completeMutation = useCompleteRepair();

  useEffect(() => {
    if (open) {
      setRepairedDate(today());
      setNotes('');
    }
  }, [open]);

  const onConfirm = () => {
    if (!productReturn || !repairedDate) return;
    completeMutation.mutate(
      {
        id: productReturn.id,
        payload: {
          repaired_return_date: repairedDate,
          notes: notes || undefined
        }
      },
      {
        onSuccess: () => {
          toast.success('Repair marked as complete.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Mark Repair Completed'
      description='Record the date the repaired product was returned to the customer.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Repaired Return Date</Label>
          <Input
            type='date'
            value={repairedDate}
            onChange={(event) => setRepairedDate(event.target.value)}
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
            disabled={completeMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            disabled={completeMutation.isPending || !repairedDate}
            onClick={onConfirm}
          >
            {completeMutation.isPending ? 'Saving...' : 'Mark Completed'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
