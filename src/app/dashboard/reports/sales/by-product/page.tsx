import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { SalesByProductReport } from '@/features/reports/components/sales-by-product-report';

export const metadata = {
  title: 'Dashboard: Sales by Product'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Sales by Product'
          description='Per-product sales breakdown'
        />
        <Separator />
        <SalesByProductReport />
      </div>
    </PageContainer>
  );
}
