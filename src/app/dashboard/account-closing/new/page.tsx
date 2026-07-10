import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ManualCloseForm } from '@/features/account-closing/components/manual-close-form';

export const metadata = {
  title: 'Dashboard: Close Account'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Close Account'
          description='Manually close a customer account'
        />
        <Separator />
        <ManualCloseForm />
      </div>
    </PageContainer>
  );
}
