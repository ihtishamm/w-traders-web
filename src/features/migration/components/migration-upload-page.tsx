'use client';

import { FileUploader } from '@/components/file-uploader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useImportMigration } from '@/features/migration/api/use-import-migration';
import { useValidateMigration } from '@/features/migration/api/use-validate-migration';
import { IconAlertTriangle, IconCheck, IconUpload } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export function MigrationUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const validateMutation = useValidateMigration();
  const importMutation = useImportMigration();

  const validationResult = validateMutation.data;
  const importResult = importMutation.data;

  const onValidate = () => {
    if (!files[0]) return;
    validateMutation.mutate(files[0]);
    importMutation.reset();
  };

  const onImport = () => {
    if (!files[0]) return;
    importMutation.mutate(files[0], {
      onSuccess: () => {
        toast.success('Migration imported successfully.');
      }
    });
  };

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Upload Excel File</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <FileUploader
            value={files}
            onValueChange={(newFiles) => {
              setFiles(newFiles);
              validateMutation.reset();
              importMutation.reset();
            }}
            accept={{ [XLSX_MIME]: ['.xlsx'] }}
            maxSize={10 * 1024 * 1024}
            maxFiles={1}
            disabled={validateMutation.isPending || importMutation.isPending}
          />
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={onValidate}
              disabled={!files[0] || validateMutation.isPending}
            >
              <IconUpload className='mr-2 h-4 w-4' />
              {validateMutation.isPending ? 'Validating...' : 'Validate'}
            </Button>
            <Button
              onClick={onImport}
              disabled={
                !files[0] ||
                !validationResult?.valid ||
                importMutation.isPending ||
                Boolean(importResult)
              }
            >
              <IconCheck className='mr-2 h-4 w-4' />
              {importMutation.isPending ? 'Importing...' : 'Import'}
            </Button>
          </div>
          {files[0] && !validationResult && (
            <p className='text-muted-foreground text-sm'>
              Validate the file before importing.
            </p>
          )}
        </CardContent>
      </Card>

      {validationResult && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              Validation Result
              <Badge
                variant={validationResult.valid ? 'outline' : 'destructive'}
              >
                {validationResult.valid ? 'Valid' : 'Invalid'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex gap-6 text-sm'>
              <span>Customer rows: {validationResult.customer_rows_found}</span>
              <span>Plan rows: {validationResult.plan_rows_found}</span>
            </div>
            {validationResult.errors.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sheet</TableHead>
                    <TableHead>Row</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationResult.errors.map((error, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow key={index}>
                      <TableCell>{error.sheet}</TableCell>
                      <TableCell>{error.row}</TableCell>
                      <TableCell>{error.field}</TableCell>
                      <TableCell>{error.value ?? '—'}</TableCell>
                      <TableCell className='text-destructive'>
                        {error.message}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

      {importResult && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconCheck className='h-5 w-5 text-green-600' />
              Import Complete
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-3 gap-4 text-sm'>
            <div>
              <p className='text-muted-foreground'>Customers Created</p>
              <p className='text-lg font-semibold'>
                {importResult.customers_created}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground'>Guarantors Created</p>
              <p className='text-lg font-semibold'>
                {importResult.guarantors_created}
              </p>
            </div>
            <div>
              <p className='text-muted-foreground'>Installment Plans Created</p>
              <p className='text-lg font-semibold'>
                {importResult.installment_plans_created}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {!validationResult?.valid && validationResult && (
        <div className='text-muted-foreground flex items-center gap-2 text-sm'>
          <IconAlertTriangle className='h-4 w-4' />
          Fix the errors above and re-upload before importing.
        </div>
      )}
    </div>
  );
}
