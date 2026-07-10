'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useReturnedInventoryReport } from '@/features/reports/api/use-returned-inventory-report';
import { ReportExportButton } from '@/features/reports/components/report-export-button';
import { ReportTable } from '@/features/reports/components/report-table';
import {
  PRODUCT_CONDITION_OPTIONS,
  RETURN_TYPE_OPTIONS,
  type ProductCondition,
  type ReturnType
} from '@/types/product-return';
import type { ReturnedInventoryRow } from '@/types/report';
import { useState } from 'react';

const ALL = '__all__';

export function InventoryReturnedReport() {
  const [returnType, setReturnType] = useState('');
  const [condition, setCondition] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const params = {
    ...(returnType && { return_type: returnType as ReturnType }),
    ...(condition && { condition: condition as ProductCondition }),
    ...(from && { from }),
    ...(to && { to })
  };
  const { data, isLoading } = useReturnedInventoryReport(params);

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-end justify-between gap-4'>
        <div className='flex flex-wrap items-end gap-4'>
          <div className='space-y-1'>
            <Label>Return Type</Label>
            <Select
              value={returnType || ALL}
              onValueChange={(value) =>
                setReturnType(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-40'>
                <SelectValue placeholder='All Types' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Types</SelectItem>
                {RETURN_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label>Condition</Label>
            <Select
              value={condition || ALL}
              onValueChange={(value) =>
                setCondition(value === ALL ? '' : value)
              }
            >
              <SelectTrigger className='w-36'>
                <SelectValue placeholder='All Conditions' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>All Conditions</SelectItem>
                {PRODUCT_CONDITION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
          endpoint='/reports/inventory/returned'
          params={params}
          filename='inventory-returned.csv'
        />
      </div>

      {data && (
        <div className='grid grid-cols-2 gap-4'>
          <Card>
            <CardHeader>
              <CardTitle className='text-muted-foreground text-sm font-normal'>
                By Condition
              </CardTitle>
            </CardHeader>
            <CardContent className='text-sm'>
              New: {data.by_condition.new} · Used: {data.by_condition.used}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='text-muted-foreground text-sm font-normal'>
                By Type
              </CardTitle>
            </CardHeader>
            <CardContent className='text-sm'>
              {Object.entries(data.by_type)
                .map(([type, count]) => `${type.replace('_', ' ')}: ${count}`)
                .join(' · ') || '—'}
            </CardContent>
          </Card>
        </div>
      )}

      <ReportTable<ReturnedInventoryRow>
        isLoading={isLoading}
        rows={data?.rows ?? []}
        columns={[
          { header: 'Product', cell: (row) => row.product.name },
          {
            header: 'Return Type',
            cell: (row) => row.return_type.replace('_', ' ')
          },
          { header: 'Condition', cell: (row) => row.condition ?? '—' },
          { header: 'Return Date', cell: (row) => row.return_date },
          { header: 'Quantity', cell: (row) => row.quantity }
        ]}
      />
    </div>
  );
}
