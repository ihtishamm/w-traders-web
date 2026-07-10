import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import DailyJournalListingPage from '@/features/daily-journal/components/daily-journal-listing';

export const metadata = {
  title: 'Dashboard: Daily Journal'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Daily Journal'
            description='Record daily expenses and notes'
          />
        </div>
        <Separator />
        <DailyJournalListingPage />
      </div>
    </PageContainer>
  );
}
