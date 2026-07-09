import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AdminDto } from '@/types/auth';

// Holds the logged-in admin's display info (name/email) only — non-sensitive,
// persisted so it survives a page refresh. The backend has no `/auth/me`
// endpoint to re-fetch this, and it's only returned once at login time.
// The actual auth gate is the auth_token cookie (see middleware.ts /
// lib/auth-cookie.ts) — this store is for display purposes only.
interface AuthState {
  admin: AdminDto | null;
  setAdmin: (admin: AdminDto) => void;
  clearAdmin: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: null })
    }),
    { name: 'auth-storage' }
  )
);

// Adapts AdminDto to the {imageUrl, fullName, emailAddresses} shape
// UserAvatarProfile / UserNav / AppSidebar expect (a leftover from the
// removed Clerk integration).
export function adminToAvatarUser(admin: AdminDto | null) {
  if (!admin) return null;
  return {
    imageUrl: '',
    fullName: admin.name,
    emailAddresses: [{ emailAddress: admin.email }]
  };
}
