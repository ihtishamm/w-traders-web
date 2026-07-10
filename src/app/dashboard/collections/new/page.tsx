import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CollectionCreateForm } from '@/features/collections/components/collection-create-form';

export const metadata = {
  title: 'Dashboard: Record Collection'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Record Collection'
          description="Record a customer visit and the recovery man's payment"
        />
        <Separator />
        <CollectionCreateForm />
      </div>
    </PageContainer>
  );
}
