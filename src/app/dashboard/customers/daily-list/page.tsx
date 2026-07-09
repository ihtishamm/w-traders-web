import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DailyListPage } from '@/features/customers/components/daily-list-page';

export const metadata = {
  title: 'Dashboard: Daily Recovery List'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Daily Recovery List'
          description="Print a recovery man's collection list for a given day"
        />
        <Separator />
        <DailyListPage />
      </div>
    </PageContainer>
  );
}
