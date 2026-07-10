import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard: Reports'
};

const REPORT_GROUPS = [
  {
    title: 'Sales',
    reports: [
      { title: 'Daily Sales', href: '/dashboard/reports/sales/daily' },
      { title: 'Monthly Sales', href: '/dashboard/reports/sales/monthly' },
      {
        title: 'Sales by Salesperson',
        href: '/dashboard/reports/sales/by-salesperson'
      },
      { title: 'Sales by Product', href: '/dashboard/reports/sales/by-product' }
    ]
  },
  {
    title: 'Recovery',
    reports: [
      {
        title: 'By Recovery Man',
        href: '/dashboard/reports/recovery/by-recovery-man'
      },
      {
        title: 'Pending Recoveries',
        href: '/dashboard/reports/recovery/pending'
      },
      {
        title: 'Missed Recoveries',
        href: '/dashboard/reports/recovery/missed'
      },
      {
        title: 'Fully Paid Customers',
        href: '/dashboard/reports/recovery/fully-paid'
      }
    ]
  },
  {
    title: 'Inventory',
    reports: [
      {
        title: 'Current Stock',
        href: '/dashboard/reports/inventory/current-stock'
      },
      { title: 'Sold Inventory', href: '/dashboard/reports/inventory/sold' },
      {
        title: 'Returned Inventory',
        href: '/dashboard/reports/inventory/returned'
      }
    ]
  },
  {
    title: 'Customers',
    reports: [
      {
        title: 'Active Customers',
        href: '/dashboard/reports/customers/active'
      },
      { title: 'Closed Accounts', href: '/dashboard/reports/customers/closed' },
      {
        title: 'Pending Installments',
        href: '/dashboard/reports/customers/pending-installments'
      }
    ]
  }
];

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Reports'
          description='Sales, recovery, inventory, and customer reports'
        />
        <Separator />
        <div className='grid gap-6 md:grid-cols-2'>
          {REPORT_GROUPS.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent className='space-y-2'>
                {group.reports.map((report) => (
                  <Link
                    key={report.href}
                    href={report.href}
                    className='hover:bg-accent block rounded-md px-3 py-2 text-sm hover:underline'
                  >
                    {report.title}
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
