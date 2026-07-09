import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CustomerDetail } from '@/features/customers/components/customer-detail';

export const metadata = {
  title: 'Dashboard: Customer'
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Customer'
          description='View and manage customer account'
        />
        <Separator />
        <CustomerDetail customerId={id} />
      </div>
    </PageContainer>
  );
}
