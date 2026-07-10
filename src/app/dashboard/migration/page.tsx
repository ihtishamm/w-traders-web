import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { MigrationUploadPage } from '@/features/migration/components/migration-upload-page';

export const metadata = {
  title: 'Dashboard: Migration'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Migration'
          description='Import legacy customers and installment plans from Excel'
        />
        <Separator />
        <MigrationUploadPage />
      </div>
    </PageContainer>
  );
}
