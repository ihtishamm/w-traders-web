import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CollectionDetail } from '@/features/collections/components/collection-detail';

export const metadata = {
  title: 'Dashboard: Collection'
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
          title='Collection'
          description='View collection detail and allocations'
        />
        <Separator />
        <CollectionDetail collectionId={id} />
      </div>
    </PageContainer>
  );
}
