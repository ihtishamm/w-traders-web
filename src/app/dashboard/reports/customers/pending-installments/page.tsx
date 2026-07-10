import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomersPendingInstallmentsReport } from '@/features/reports/components/customers-pending-installments-report';

export const metadata = {
  title: 'Dashboard: Pending Installments Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Pending Installments'
          description='Active customers with pending missed recoveries'
        />
        <Separator />
        <CustomersPendingInstallmentsReport />
      </div>
    </PageContainer>
  );
}
