import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { InventoryCurrentStockReport } from '@/features/reports/components/inventory-current-stock-report';

export const metadata = {
  title: 'Dashboard: Current Stock Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Current Stock'
          description='Active products with current stock quantity'
        />
        <Separator />
        <InventoryCurrentStockReport />
      </div>
    </PageContainer>
  );
}
