'use client';

import { Button } from '@/components/ui/button';
import { downloadReportCsv } from '@/features/reports/api/download-report-csv';
import { IconDownload } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ReportExportButtonProps {
  endpoint: string;
  params: Record<string, unknown>;
  filename: string;
}

export function ReportExportButton({
  endpoint,
  params,
  filename
}: ReportExportButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const onClick = async () => {
    setDownloading(true);
    try {
      await downloadReportCsv(endpoint, params, filename);
    } catch {
      toast.error('Failed to export CSV.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button variant='outline' onClick={onClick} disabled={downloading}>
      <IconDownload className='mr-2 h-4 w-4' />
      {downloading ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
}
