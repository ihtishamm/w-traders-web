'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';
import { Textarea } from '@/components/ui/textarea';
import { useReverseCollection } from '@/features/collections/api/use-reverse-collection';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReverseCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string | null;
  onReversed?: () => void;
}

export function ReverseCollectionDialog({
  open,
  onOpenChange,
  collectionId,
  onReversed
}: ReverseCollectionDialogProps) {
  const [reason, setReason] = useState('');
  const reverseMutation = useReverseCollection();

  const onConfirm = () => {
    if (!collectionId || !reason) return;
    reverseMutation.mutate(
      { id: collectionId, payload: { reason } },
      {
        onSuccess: () => {
          toast.success('Collection reversed.');
          setReason('');
          onOpenChange(false);
          onReversed?.();
        }
      }
    );
  };

  return (
    <Modal
      title='Reverse Collection'
      description='This creates an offsetting entry and reopens any resolved missed recoveries. This action cannot be undone.'
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Reason</Label>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            disabled={reverseMutation.isPending}
          />
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            disabled={reverseMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Back
          </Button>
          <Button
            type='button'
            variant='destructive'
            disabled={reverseMutation.isPending || !reason}
            onClick={onConfirm}
          >
            {reverseMutation.isPending ? 'Reversing...' : 'Reverse Collection'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
