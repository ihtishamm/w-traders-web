import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import AccountClosingListingPage from '@/features/account-closing/components/account-closing-listing';

export const metadata = {
  title: 'Dashboard: Account Closing'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Account Closing'
            description='Closed customer accounts'
          />
        </div>
        <Separator />
        <AccountClosingListingPage />
      </div>
    </PageContainer>
  );
}
