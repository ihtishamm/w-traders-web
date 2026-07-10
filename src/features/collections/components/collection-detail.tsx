'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useCollection } from '@/features/collections/api/use-collection';
import { AllocateSurplusDialog } from '@/features/collections/components/allocate-surplus-dialog';
import { ReverseCollectionDialog } from '@/features/collections/components/reverse-collection-dialog';
import { IconArrowBackUp, IconCoins } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

interface CollectionDetailProps {
  collectionId: string;
}

export function CollectionDetail({ collectionId }: CollectionDetailProps) {
  const { data: collection, isLoading } = useCollection(collectionId);
  const [allocateOpen, setAllocateOpen] = useState(false);
  const [reverseOpen, setReverseOpen] = useState(false);

  if (isLoading || !collection) {
    return <Skeleton className='h-64 w-full' />;
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader className='flex flex-row items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-xl'>
              Collection — {collection.collection_date}
              <Badge variant='outline' className='capitalize'>
                {collection.status}
              </Badge>
            </CardTitle>
          </div>
          <div className='flex gap-2'>
            {collection.unallocated_surplus_rupees > 0 && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => setAllocateOpen(true)}
              >
                <IconCoins className='mr-2 h-4 w-4' /> Allocate Surplus
              </Button>
            )}
            <Button
              variant='destructive'
              size='sm'
              onClick={() => setReverseOpen(true)}
            >
              <IconArrowBackUp className='mr-2 h-4 w-4' /> Reverse
            </Button>
          </div>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div>
            <p className='text-muted-foreground text-sm'>Customer</p>
            <Link
              href={`/dashboard/customers/${collection.customer.id}`}
              className='font-medium hover:underline'
            >
              {collection.customer.name} ({collection.customer.khaata_no})
            </Link>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Recovery Man</p>
            <p>{collection.recovery_man.name}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Expected Amount</p>
            <p>Rs. {collection.expected_amount_rupees}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Amount Collected</p>
            <p>Rs. {collection.amount_collected_rupees}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Unallocated Surplus</p>
            <p>Rs. {collection.unallocated_surplus_rupees}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Promised Next Date</p>
            <p>{collection.promised_next_date ?? '—'}</p>
          </div>
          {collection.notes && (
            <div className='md:col-span-2'>
              <p className='text-muted-foreground text-sm'>Notes</p>
              <p>{collection.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Allocations</CardTitle>
        </CardHeader>
        <CardContent>
          {collection.allocations.length === 0 ? (
            <p className='text-muted-foreground text-sm'>No allocations.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount Applied</TableHead>
                  <TableHead>Balance Before</TableHead>
                  <TableHead>Balance After</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collection.allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>{allocation.product_name ?? '—'}</TableCell>
                    <TableCell>
                      Rs. {allocation.amount_applied_rupees}
                    </TableCell>
                    <TableCell>
                      Rs. {allocation.balance_before_rupees}
                    </TableCell>
                    <TableCell>Rs. {allocation.balance_after_rupees}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Missed Recoveries Created</CardTitle>
        </CardHeader>
        <CardContent>
          {collection.missed_recoveries_created.length === 0 ? (
            <p className='text-muted-foreground text-sm'>None.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount Due</TableHead>
                  <TableHead>Original Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collection.missed_recoveries_created.map((missed) => (
                  <TableRow key={missed.installment_plan_id}>
                    <TableCell>{missed.product_name}</TableCell>
                    <TableCell>Rs. {missed.amount_due_rupees}</TableCell>
                    <TableCell>{missed.original_due_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AllocateSurplusDialog
        open={allocateOpen}
        onOpenChange={setAllocateOpen}
        collection={collection}
      />
      <ReverseCollectionDialog
        open={reverseOpen}
        onOpenChange={setReverseOpen}
        collectionId={collection.id}
      />
    </div>
  );
}
