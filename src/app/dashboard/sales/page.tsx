import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import SaleListingPage from '@/features/sales/components/sale-listing';

export const metadata = {
  title: 'Dashboard: Sales'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Sales'
            description='Manage sales and installment plans'
          />
        </div>
        <Separator />
        <SaleListingPage />
      </div>
    </PageContainer>
  );
}
