import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { RecoveryByManReport } from '@/features/reports/components/recovery-by-man-report';

export const metadata = {
  title: 'Dashboard: Recovery by Recovery Man'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Recovery by Recovery Man'
          description='Per-recovery-man recovery breakdown'
        />
        <Separator />
        <RecoveryByManReport />
      </div>
    </PageContainer>
  );
}
