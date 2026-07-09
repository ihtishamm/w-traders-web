import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomerCreateForm } from '@/features/customers/components/customer-create-form';

export const metadata = {
  title: 'Dashboard: New Customer'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='New Customer'
          description='Create a customer along with their guarantor'
        />
        <Separator />
        <CustomerCreateForm />
      </div>
    </PageContainer>
  );
}
