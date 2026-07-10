import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { InventoryReturnedReport } from '@/features/reports/components/inventory-returned-report';

export const metadata = {
  title: 'Dashboard: Returned Inventory Report'
};

export default function Page() {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Returned Inventory'
          description='Return movements split by condition and type'
        />
        <Separator />
        <InventoryReturnedReport />
      </div>
    </PageContainer>
  );
}
