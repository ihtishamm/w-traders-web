'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useReconciliation } from '@/features/reconciliation/api/use-reconciliation';

interface ReconciliationDetailProps {
  recoveryManId: string;
  date: string;
}

export function ReconciliationDetail({
  recoveryManId,
  date
}: ReconciliationDetailProps) {
  const { data: reconciliation, isLoading } = useReconciliation(
    recoveryManId,
    date
  );

  if (isLoading || !reconciliation) {
    return <Skeleton className='h-48 w-full' />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          {reconciliation.recovery_man.name} — {reconciliation.date}
          <Badge
            variant={
              reconciliation.variance_rupees === 0 ? 'outline' : 'destructive'
            }
          >
            Variance: Rs. {reconciliation.variance_rupees}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 md:grid-cols-2'>
        <div>
          <p className='text-muted-foreground text-sm'>Expected Total</p>
          <p>Rs. {reconciliation.expected_total_rupees}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Collected Total</p>
          <p>Rs. {reconciliation.collected_total_rupees}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Deposited Amount</p>
          <p>Rs. {reconciliation.deposited_amount_rupees}</p>
        </div>
        <div>
          <p className='text-muted-foreground text-sm'>Expense</p>
          <p>Rs. {reconciliation.expense_rupees}</p>
        </div>
        {reconciliation.notes && (
          <div className='md:col-span-2'>
            <p className='text-muted-foreground text-sm'>Notes</p>
            <p>{reconciliation.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
