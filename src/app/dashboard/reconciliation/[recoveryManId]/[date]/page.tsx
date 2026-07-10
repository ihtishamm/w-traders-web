import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReconciliationDetail } from '@/features/reconciliation/components/reconciliation-detail';

export const metadata = {
  title: 'Dashboard: Reconciliation Detail'
};

interface PageProps {
  params: Promise<{ recoveryManId: string; date: string }>;
}

export default async function Page({ params }: PageProps) {
  const { recoveryManId, date } = await params;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Reconciliation'
          description='View reconciliation detail'
        />
        <Separator />
        <ReconciliationDetail recoveryManId={recoveryManId} date={date} />
      </div>
    </PageContainer>
  );
}
