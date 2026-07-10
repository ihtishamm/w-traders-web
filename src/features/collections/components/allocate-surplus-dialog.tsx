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
import { useAllocateSurplus } from '@/features/collections/api/use-allocate-surplus';
import { useInstallmentPlans } from '@/features/installment-plans/api/use-installment-plans';
import type { Collection } from '@/types/collection';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AllocateSurplusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection: Collection | null;
}

export function AllocateSurplusDialog({
  open,
  onOpenChange,
  collection
}: AllocateSurplusDialogProps) {
  const [planId, setPlanId] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const allocateMutation = useAllocateSurplus();

  const { data: plans } = useInstallmentPlans({
    customer_id: collection?.customer.id,
    status: 'active',
    limit: 100
  });

  useEffect(() => {
    if (open && collection) {
      setPlanId('');
      setAmount(String(collection.unallocated_surplus_rupees));
      setNotes('');
    }
  }, [open, collection]);

  const onConfirm = () => {
    if (!collection || !planId || !amount) return;
    allocateMutation.mutate(
      {
        id: collection.id,
        payload: {
          installment_plan_id: planId,
          amount_rupees: Number(amount),
          notes: notes || undefined
        }
      },
      {
        onSuccess: () => {
          toast.success('Surplus allocated.');
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Modal
      title='Allocate Surplus'
      description={
        collection
          ? `Assign the Rs. ${collection.unallocated_surplus_rupees} unallocated surplus to a plan.`
          : ''
      }
      isOpen={open}
      onClose={() => onOpenChange(false)}
    >
      <div className='space-y-4'>
        <div className='space-y-1'>
          <Label>Installment Plan</Label>
          <Select value={planId} onValueChange={setPlanId}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select plan' />
            </SelectTrigger>
            <SelectContent>
              {plans?.data.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.product.name} — Rs. {plan.remaining_balance_rupees}{' '}
                  remaining
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-1'>
          <Label>Amount (Rs.)</Label>
          <Input
            type='number'
            min={1}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
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
            disabled={allocateMutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type='button'
            disabled={allocateMutation.isPending || !planId || !amount}
            onClick={onConfirm}
          >
            {allocateMutation.isPending ? 'Allocating...' : 'Allocate'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
