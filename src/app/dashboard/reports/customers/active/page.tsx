import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomersActiveReport } from '@/features/reports/components/customers-active-report';

export const metadata = {
  title: 'Dashboard: Active Customers Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Active Customers'
          description='Active customers with plan count and outstanding'
        />
        <Separator />
        <CustomersActiveReport />
      </div>
    </PageContainer>
  );
}
