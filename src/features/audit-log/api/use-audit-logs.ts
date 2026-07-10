'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { AuditLog, AuditLogListParams } from '@/types/audit-log';
import type { Page } from '@/types/api';

async function fetchAuditLogs(
  params: AuditLogListParams
): Promise<Page<AuditLog>> {
  const { data } = await api.get<Page<AuditLog>>('/audit-log', { params });
  return data;
}

export function useAuditLogs(params: AuditLogListParams) {
  return useQuery({
    queryKey: ['audit-log', params],
    queryFn: () => fetchAuditLogs(params)
  });
}
