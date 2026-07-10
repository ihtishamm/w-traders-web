import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { RecoveryFullyPaidReport } from '@/features/reports/components/recovery-fully-paid-report';

export const metadata = {
  title: 'Dashboard: Fully Paid Customers'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Fully Paid Customers'
          description='Customers with all plans completed'
        />
        <Separator />
        <RecoveryFullyPaidReport />
      </div>
    </PageContainer>
  );
}
