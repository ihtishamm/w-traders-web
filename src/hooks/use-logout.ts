'use client';

import { useRouter } from 'next/navigation';

import { clearAuthToken } from '@/lib/auth-cookie';
import { useAuthStore } from '@/store/auth-store';

export function useLogout() {
  const router = useRouter();
  const clearAdmin = useAuthStore((state) => state.clearAdmin);

  return () => {
    clearAuthToken();
    clearAdmin();
    router.push('/auth/sign-in');
  };
}
