import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { RecoveryMissedReport } from '@/features/reports/components/recovery-missed-report';

export const metadata = {
  title: 'Dashboard: Missed Recoveries Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Missed Recoveries'
          description='Missed recovery records with customer/plan detail'
        />
        <Separator />
        <RecoveryMissedReport />
      </div>
    </PageContainer>
  );
}
