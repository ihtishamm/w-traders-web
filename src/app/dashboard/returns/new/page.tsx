import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ReturnCreateForm } from '@/features/returns/components/return-create-form';

export const metadata = {
  title: 'Dashboard: Record Return'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Record Return'
          description='Record a product return, repair, or repossession'
        />
        <Separator />
        <ReturnCreateForm />
      </div>
    </PageContainer>
  );
}
