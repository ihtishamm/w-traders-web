'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { SalesReport } from '@/types/report';

export interface SalesTrendPoint {
  label: string;
  total_amount_rupees: number;
  sales_count: number;
}

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

/** Last `months` months of sales totals, oldest first — built from repeated
 * calls to the monthly sales report since the backend has no trend endpoint. */
export function useSalesTrend(months = 6) {
  return useQuery({
    queryKey: ['reports', 'sales', 'trend', months],
    queryFn: async () => {
      const now = new Date();
      const targets = Array.from({ length: months }, (_, index) => {
        const date = new Date(
          now.getFullYear(),
          now.getMonth() - (months - 1 - index),
          1
        );
        return { year: date.getFullYear(), month: date.getMonth() + 1 };
      });

      const results = await Promise.all(
        targets.map(({ year, month }) =>
          api.get<SalesReport>('/reports/sales/monthly', {
            params: { year, month }
          })
        )
      );

      return results.map(
        (res, index): SalesTrendPoint => ({
          label: MONTH_LABELS[targets[index].month - 1],
          total_amount_rupees: res.data.totals.total_amount_rupees,
          sales_count: res.data.totals.sales_count
        })
      );
    }
  });
}
