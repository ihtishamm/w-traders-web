import { api } from '@/lib/axios';

/**
 * Reports support `?format=csv` server-side, but a plain <a href> or
 * window.open() can't attach the Bearer auth header, so we fetch as a blob
 * through the authenticated axios instance and trigger the download manually.
 */
export async function downloadReportCsv(
  endpoint: string,
  params: Record<string, unknown>,
  filename: string
): Promise<void> {
  const { data } = await api.get<Blob>(endpoint, {
    params: { ...params, format: 'csv' },
    responseType: 'blob'
  });

  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
