import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CollectionListingPage from '@/features/collections/components/collection-listing';

export const metadata = {
  title: 'Dashboard: Collections'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Collections'
            description='Record and manage payment collections'
          />
        </div>
        <Separator />
        <CollectionListingPage />
      </div>
    </PageContainer>
  );
}
