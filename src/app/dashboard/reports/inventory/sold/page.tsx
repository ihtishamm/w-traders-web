import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { InventorySoldReport } from '@/features/reports/components/inventory-sold-report';

export const metadata = {
  title: 'Dashboard: Sold Inventory Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Sold Inventory'
          description='Sale inventory movements with product/customer detail'
        />
        <Separator />
        <InventorySoldReport />
      </div>
    </PageContainer>
  );
}
