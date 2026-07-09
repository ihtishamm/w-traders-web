import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SaleCreateForm } from '@/features/sales/components/sale-create-form';

export const metadata = {
  title: 'Dashboard: New Sale'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='New Sale'
          description='Create a sale with one or more product lines'
        />
        <Separator />
        <SaleCreateForm />
      </div>
    </PageContainer>
  );
}
