import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ProductListingPage from '@/features/products/components/product-listing';

export const metadata = {
  title: 'Dashboard: Products'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Products'
            description='Manage products available for sale on installment'
          />
        </div>
        <Separator />
        <ProductListingPage />
      </div>
    </PageContainer>
  );
}
