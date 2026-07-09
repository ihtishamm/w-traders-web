import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SaleDetail } from '@/features/sales/components/sale-detail';

export const metadata = {
  title: 'Dashboard: Sale'
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
          title='Sale'
          description='View sale and its installment plans'
        />
        <Separator />
        <SaleDetail saleId={id} />
      </div>
    </PageContainer>
  );
}
