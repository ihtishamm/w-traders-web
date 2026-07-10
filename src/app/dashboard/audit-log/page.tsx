import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import AuditLogListingPage from '@/features/audit-log/components/audit-log-listing';

export const metadata = {
  title: 'Dashboard: Audit Log'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Audit Log' description='System-wide change history' />
        </div>
        <Separator />
        <AuditLogListingPage />
      </div>
    </PageContainer>
  );
}
