import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import InstallmentPlanListingPage from '@/features/installment-plans/components/installment-plan-listing';

export const metadata = {
  title: 'Dashboard: Installment Plans'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Installment Plans'
            description='Manage recovery assignments and schedules'
          />
        </div>
        <Separator />
        <InstallmentPlanListingPage />
      </div>
    </PageContainer>
  );
}
