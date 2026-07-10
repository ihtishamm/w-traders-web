'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MigrationImportResult } from '@/types/migration';

async function importMigration(file: File): Promise<MigrationImportResult> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<MigrationImportResult>(
    '/migration/import',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  return data;
}

export function useImportMigration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importMigration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['installment-plans'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}
