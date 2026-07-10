import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ReturnListingPage from '@/features/returns/components/return-listing';

export const metadata = {
  title: 'Dashboard: Returns'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Returns'
            description='Product returns, repairs, and repossessions'
          />
        </div>
        <Separator />
        <ReturnListingPage />
      </div>
    </PageContainer>
  );
}
