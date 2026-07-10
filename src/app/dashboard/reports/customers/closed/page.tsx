import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomersClosedReport } from '@/features/reports/components/customers-closed-report';

export const metadata = {
  title: 'Dashboard: Closed Accounts Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Closed Accounts'
          description='Closed accounts with closing detail'
        />
        <Separator />
        <CustomersClosedReport />
      </div>
    </PageContainer>
  );
}
