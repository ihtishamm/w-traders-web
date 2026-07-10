import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { RecoveryPendingReport } from '@/features/reports/components/recovery-pending-report';

export const metadata = {
  title: 'Dashboard: Pending Recoveries'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Pending Recoveries'
          description='All active plans with next due date and balance'
        />
        <Separator />
        <RecoveryPendingReport />
      </div>
    </PageContainer>
  );
}
