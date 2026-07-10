import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { AccountClosingDetail } from '@/features/account-closing/components/account-closing-detail';

export const metadata = {
  title: 'Dashboard: Account Closing Detail'
};

interface PageProps {
  params: Promise<{ customerId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { customerId } = await params;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading title='Account Closing' description='View closing record' />
        <Separator />
        <AccountClosingDetail customerId={customerId} />
      </div>
    </PageContainer>
  );
}
