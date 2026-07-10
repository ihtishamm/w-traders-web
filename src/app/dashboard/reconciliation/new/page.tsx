import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReconciliationSubmitForm } from '@/features/reconciliation/components/reconciliation-submit-form';

export const metadata = {
  title: 'Dashboard: Submit Reconciliation'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Submit Reconciliation'
          description="Record a recovery man's daily deposit"
        />
        <Separator />
        <ReconciliationSubmitForm />
      </div>
    </PageContainer>
  );
}
