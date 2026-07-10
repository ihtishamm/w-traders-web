import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { ReactNode } from 'react';

export interface ReportColumn<T> {
  header: string;
  cell: (row: T) => ReactNode;
}

interface ReportTableProps<T> {
  columns: ReportColumn<T>[];
  rows: T[];
  isLoading: boolean;
  emptyMessage?: string;
}

export function ReportTable<T>({
  columns,
  rows,
  isLoading,
  emptyMessage = 'No data for the selected filters.'
}: ReportTableProps<T>) {
  if (isLoading) {
    return <Skeleton className='h-64 w-full' />;
  }

  if (rows.length === 0) {
    return <p className='text-muted-foreground text-sm'>{emptyMessage}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.header}>{column.cell(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
