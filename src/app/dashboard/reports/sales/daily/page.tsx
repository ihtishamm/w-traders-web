import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SalesDailyReport } from '@/features/reports/components/sales-daily-report';

export const metadata = {
  title: 'Dashboard: Daily Sales Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Daily Sales'
          description='Sales on a given date with product breakdown'
        />
        <Separator />
        <SalesDailyReport />
      </div>
    </PageContainer>
  );
}
