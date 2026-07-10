import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SalesMonthlyReport } from '@/features/reports/components/sales-monthly-report';

export const metadata = {
  title: 'Dashboard: Monthly Sales Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Monthly Sales'
          description='Sales in a given month, aggregated totals'
        />
        <Separator />
        <SalesMonthlyReport />
      </div>
    </PageContainer>
  );
}
