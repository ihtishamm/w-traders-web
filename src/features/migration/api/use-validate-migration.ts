'use client';

import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MigrationValidationResult } from '@/types/migration';

async function validateMigration(
  file: File
): Promise<MigrationValidationResult> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<MigrationValidationResult>(
    '/migration/validate',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
}

export function useValidateMigration() {
  return useMutation({ mutationFn: validateMigration });
}
