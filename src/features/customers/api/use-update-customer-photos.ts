'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';

interface UpdatePhotosPayload {
  id: string;
  customer_photo?: File;
  cnic_photo?: File;
}

interface UpdatePhotosResponse {
  customer_photo_url: string | null;
  cnic_photo_url: string | null;
}

async function updateCustomerPhotos({
  id,
  customer_photo,
  cnic_photo
}: UpdatePhotosPayload): Promise<UpdatePhotosResponse> {
  const formData = new FormData();
  if (customer_photo) formData.append('customer_photo', customer_photo);
  if (cnic_photo) formData.append('cnic_photo', cnic_photo);

  const { data } = await api.patch<UpdatePhotosResponse>(
    `/customers/${id}/photos`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
}

export function useUpdateCustomerPhotos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomerPhotos,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customers', variables.id] });
    }
  });
}
