import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ChangePasswordForm } from '@/features/auth/components/change-password-form';

export const metadata = {
  title: 'Dashboard: Profile'
};

export default function Page() {
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading title='Profile' description='Manage your account settings' />
        <Separator />
        <ChangePasswordForm />
      </div>
    </PageContainer>
  );
}
