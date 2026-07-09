'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCustomer } from '@/features/customers/api/use-customer';
import { CustomerAccountSummary } from '@/features/customers/components/customer-account-summary';
import { CustomerEditDialog } from '@/features/customers/components/customer-edit-dialog';
import { CustomerPhotosCard } from '@/features/customers/components/customer-photos-card';
import { GuarantorEditDialog } from '@/features/guarantors/components/guarantor-edit-dialog';
import { IconPencil } from '@tabler/icons-react';
import { useState } from 'react';

interface CustomerDetailProps {
  customerId: string;
}

export function CustomerDetail({ customerId }: CustomerDetailProps) {
  const { data: customer, isLoading } = useCustomer(customerId);
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [guarantorDialogOpen, setGuarantorDialogOpen] = useState(false);

  if (isLoading || !customer) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-32 w-full' />
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader className='flex flex-row items-start justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2 text-xl'>
              {customer.name}
              <Badge variant='outline' className='capitalize'>
                {customer.status}
              </Badge>
            </CardTitle>
            <p className='text-muted-foreground text-sm'>
              Khaata No. {customer.khaata_no}
            </p>
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCustomerDialogOpen(true)}
          >
            <IconPencil className='mr-2 h-4 w-4' /> Edit
          </Button>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div>
            <p className='text-muted-foreground text-sm'>CNIC</p>
            <p>{customer.cnic ?? '—'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Phone</p>
            <p>{customer.phone ?? '—'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Business Address</p>
            <p>{customer.business_address ?? '—'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Residential Address</p>
            <p>{customer.residential_address ?? '—'}</p>
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Recovery Man</p>
            <p>{customer.assigned_recovery_man?.name ?? '—'}</p>
          </div>
        </CardContent>
      </Card>

      <CustomerPhotosCard customer={customer} />

      {customer.guarantor && (
        <Card>
          <CardHeader className='flex flex-row items-start justify-between'>
            <CardTitle>Guarantor</CardTitle>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setGuarantorDialogOpen(true)}
            >
              <IconPencil className='mr-2 h-4 w-4' /> Edit
            </Button>
          </CardHeader>
          <CardContent className='grid gap-4 md:grid-cols-2'>
            <div>
              <p className='text-muted-foreground text-sm'>Name</p>
              <p>{customer.guarantor.name}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>CNIC</p>
              <p>{customer.guarantor.cnic ?? '—'}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>Phone</p>
              <p>{customer.guarantor.phone ?? '—'}</p>
            </div>
            <div>
              <p className='text-muted-foreground text-sm'>Relationship</p>
              <p>{customer.guarantor.relationship ?? '—'}</p>
            </div>
            <div className='md:col-span-2'>
              <p className='text-muted-foreground text-sm'>Address</p>
              <p>{customer.guarantor.address ?? '—'}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <CustomerAccountSummary customerId={customerId} />

      <CustomerEditDialog
        open={customerDialogOpen}
        onOpenChange={setCustomerDialogOpen}
        customer={customer}
      />
      {customer.guarantor && (
        <GuarantorEditDialog
          open={guarantorDialogOpen}
          onOpenChange={setGuarantorDialogOpen}
          guarantor={customer.guarantor}
        />
      )}
    </div>
  );
}
