import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import SalespersonListingPage from '@/features/salespersons/components/salesperson-listing';

export const metadata = {
  title: 'Dashboard: Salespersons'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Salespersons'
            description='Manage salespersons who sell products to customers'
          />
        </div>
        <Separator />
        <SalespersonListingPage />
      </div>
    </PageContainer>
  );
}
