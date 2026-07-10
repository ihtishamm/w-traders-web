import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ReconciliationListingPage from '@/features/reconciliation/components/reconciliation-listing';

export const metadata = {
  title: 'Dashboard: Reconciliation'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Reconciliation'
            description='Track daily deposits against collections'
          />
        </div>
        <Separator />
        <ReconciliationListingPage />
      </div>
    </PageContainer>
  );
}
