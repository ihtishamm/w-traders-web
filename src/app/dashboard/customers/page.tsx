import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import CustomerListingPage from '@/features/customers/components/customer-listing';

export const metadata = {
  title: 'Dashboard: Customers'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Customers'
            description='Manage customers and their installment accounts'
          />
        </div>
        <Separator />
        <CustomerListingPage />
      </div>
    </PageContainer>
  );
}
