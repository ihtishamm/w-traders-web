'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateCustomerPhotos } from '@/features/customers/api/use-update-customer-photos';
import type { Customer } from '@/types/customer';
import { useState } from 'react';
import { toast } from 'sonner';

interface CustomerPhotosCardProps {
  customer: Customer;
}

export function CustomerPhotosCard({ customer }: CustomerPhotosCardProps) {
  const [customerPhoto, setCustomerPhoto] = useState<File[]>([]);
  const [cnicPhoto, setCnicPhoto] = useState<File[]>([]);
  const updatePhotosMutation = useUpdateCustomerPhotos();

  const hasPendingUpload = customerPhoto.length > 0 || cnicPhoto.length > 0;

  const onSave = () => {
    updatePhotosMutation.mutate(
      {
        id: customer.id,
        customer_photo: customerPhoto[0],
        cnic_photo: cnicPhoto[0]
      },
      {
        onSuccess: () => {
          toast.success('Photos updated.');
          setCustomerPhoto([]);
          setCnicPhoto([]);
        }
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Customer Photo</p>
            {customer.customer_photo_url && customerPhoto.length === 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={customer.customer_photo_url}
                alt='Customer'
                className='h-32 w-32 rounded-md object-cover'
              />
            )}
            <FileUploader
              value={customerPhoto}
              onValueChange={setCustomerPhoto}
              accept={{ 'image/jpeg': [], 'image/png': [] }}
              maxSize={5 * 1024 * 1024}
              maxFiles={1}
              disabled={updatePhotosMutation.isPending}
            />
          </div>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>CNIC Photo</p>
            {customer.cnic_photo_url && cnicPhoto.length === 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={customer.cnic_photo_url}
                alt='CNIC'
                className='h-32 w-32 rounded-md object-cover'
              />
            )}
            <FileUploader
              value={cnicPhoto}
              onValueChange={setCnicPhoto}
              accept={{ 'image/jpeg': [], 'image/png': [] }}
              maxSize={5 * 1024 * 1024}
              maxFiles={1}
              disabled={updatePhotosMutation.isPending}
            />
          </div>
        </div>
        {hasPendingUpload && (
          <Button onClick={onSave} disabled={updatePhotosMutation.isPending}>
            {updatePhotosMutation.isPending ? 'Uploading...' : 'Save Photos'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
