import axios from 'axios';

import { clearAuthToken, getAuthToken } from '@/lib/auth-cookie';
import type { ApiError } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach auth token from the auth_token cookie on every request (client-side only)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────────────────────
// Normalise errors so React Query can inspect `error.status`, and force a
// logout on 401 — the backend issues no refresh token, so an expired/invalid
// access token can never be silently recovered.
//
// Exception: /auth/* endpoints return 401 for domain-level credential checks
// (wrong login password, wrong current-password on change-password) that have
// nothing to do with the session token — those must NOT trigger a logout.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const normalised: ApiError = {
        status: error.response.status,
        message: error.response.data?.message ?? error.message,
        data: error.response.data
      };

      const requestUrl: string = error.config?.url ?? '';
      const isAuthEndpoint = requestUrl.startsWith('/auth/');

      if (
        normalised.status === 401 &&
        !isAuthEndpoint &&
        typeof window !== 'undefined'
      ) {
        clearAuthToken();
        if (!window.location.pathname.startsWith('/auth/sign-in')) {
          window.location.href = '/auth/sign-in';
        }
      }

      return Promise.reject(normalised);
    }
    return Promise.reject(error);
  }
);

export default api;
