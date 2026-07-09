'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Product } from '@/types/product';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CellAction } from './cell-action';

export function getProductColumns(
  onEdit: (product: Product) => void
): ColumnDef<Product>[] {
  return [
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }: { column: Column<Product, unknown> }) => (
        <DataTableColumnHeader column={column} title='Name' />
      )
    },
    {
      accessorKey: 'code',
      header: 'CODE',
      cell: ({ cell }) => cell.getValue<Product['code']>() ?? '—'
    },
    {
      accessorKey: 'category',
      header: 'CATEGORY'
    },
    {
      accessorKey: 'selling_price_rupees',
      header: 'SELLING PRICE',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Product['selling_price_rupees']>()}`
    },
    {
      accessorKey: 'default_weekly_installment_rupees',
      header: 'WEEKLY INSTALLMENT',
      cell: ({ cell }) =>
        `Rs. ${cell.getValue<Product['default_weekly_installment_rupees']>()}`
    },
    {
      accessorKey: 'stock_quantity',
      header: 'STOCK'
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
      cell: ({ cell }) => {
        const status = cell.getValue<Product['status']>();
        const Icon = status === 'active' ? CheckCircle2 : XCircle;
        return (
          <Badge variant='outline' className='capitalize'>
            <Icon className='mr-1 h-3 w-3' />
            {status}
          </Badge>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} onEdit={onEdit} />
    }
  ];
}
