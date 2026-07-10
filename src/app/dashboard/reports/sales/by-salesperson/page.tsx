import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SalesBySalespersonReport } from '@/features/reports/components/sales-by-salesperson-report';

export const metadata = {
  title: 'Dashboard: Sales by Salesperson'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Sales by Salesperson'
          description='Per-salesperson sales breakdown'
        />
        <Separator />
        <SalesBySalespersonReport />
      </div>
    </PageContainer>
  );
}
