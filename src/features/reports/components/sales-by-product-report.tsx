'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useProducts } from '@/features/products/api/use-products';
import { useSalesByProductReport } from '@/features/reports/api/use-sales-by-product-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import type { SalesByProductRow } from '@/types/report';
import { useState } from 'react';

const ALL = '__all__';

export function SalesByProductReport() {
  const [productId, setProductId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const { data: products } = useProducts({ limit: 100, status: 'active' });
  const params = {
    ...(productId && { product_id: productId }),
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useSalesByProductReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
          <div className='space-y-1'>
            <Label>Product</Label>
            <Select
              value={productId || ALL}
              onValueChange={(value) =>
                setProductId(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='All Products' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Products</SelectItem>
                {products?.data.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label>From</Label>
            <Input
              type='date'
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className='space-y-1'>
            <Label>To</Label>
            <Input
              type='date'
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <ReportExportButton
          endpoint='/reports/sales/by-product'
          params={params}
          filename='sales-by-product.csv'
        />
      </div>

      <ReportTable<SalesByProductRow>
        isLoading={isLoading}
        rows={data ?? []}
        columns={[
          { header: 'Product', cell: (row) => row.product.name },
          { header: 'Units Sold', cell: (row) => row.units_sold },
          { header: 'Units Returned', cell: (row) => row.units_returned },
          {
            header: 'Total Revenue',
            cell: (row) => `Rs. ${row.total_revenue_rupees}`
          }
        ]}
      />
    </div>
  );
}
