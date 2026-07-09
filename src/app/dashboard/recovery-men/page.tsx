import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import RecoveryManListingPage from '@/features/recovery-men/components/recovery-man-listing';

export const metadata = {
  title: 'Dashboard: Recovery Men'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Recovery Men'
            description='Manage recovery men who collect installment payments'
          />
        </div>
        <Separator />
        <RecoveryManListingPage />
      </div>
    </PageContainer>
  );
}
