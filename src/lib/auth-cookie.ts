import Cookies from 'js-cookie';

import { AUTH_TOKEN_COOKIE } from '@/constants/auth';

// Readable (non-httpOnly) cookie: the frontend (:3000-ish) and backend (:3001)
// are different origins, so an httpOnly cookie wouldn't be auto-attached to
// API calls anyway without CORS-credentials plumbing. A readable cookie lets
// middleware.ts guard routes server-side AND axios.ts attach the Bearer
// header client-side, from one source of truth.

export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_COOKIE);
}

export function setAuthToken(token: string, expiresInSeconds: number): void {
  Cookies.set(AUTH_TOKEN_COOKIE, token, {
    expires: expiresInSeconds / 86_400, // js-cookie expects days
    sameSite: 'lax'
  });
}

export function clearAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_COOKIE);
}
