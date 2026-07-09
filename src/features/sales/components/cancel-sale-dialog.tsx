'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { useCancelSale } from '@/features/sales/api/use-cancel-sale';
import { useState } from 'react';
import { toast } from 'sonner';

interface CancelSaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saleId: string | null;
}

export function CancelSaleDialog({
  open,
  onOpenChange,
  saleId
}: CancelSaleDialogProps) {
  const [notes, setNotes] = useState('');
  const cancelMutation = useCancelSale();

  const onConfirm = () => {
    if (!saleId) return;
    cancelMutation.mutate(
      { id: saleId, payload: { notes: notes || undefined } },
      {
        onSuccess: () => {
          toast.success('Sale cancelled.');
          setNotes('');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Cancel Sale'
      description='This will cancel the sale and its installment plans. This action cannot be undone.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Notes (optional)</Label>
          <Textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            disabled={cancelMutation.isPending}
          />
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            disabled={cancelMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Back
          </Button>
          <Button
            type='button'
            variant='destructive'
            disabled={cancelMutation.isPending}
            onClick={onConfirm}
          >
            {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Sale'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
