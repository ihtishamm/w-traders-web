import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import MissedRecoveryListingPage from '@/features/missed-recoveries/components/missed-recovery-listing';

export const metadata = {
  title: 'Dashboard: Missed Recoveries'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Missed Recoveries'
            description='Track and follow up on missed installment collections'
          />
        </div>
        <Separator />
        <MissedRecoveryListingPage />
      </div>
    </PageContainer>
  );
}
