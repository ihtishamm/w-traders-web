import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ── Request interceptor ──────────────────────────────────────────────────────
// Attach auth token from localStorage on every request (client-side only)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ─────────────────────────────────────────────────────
// Normalise errors so React Query can inspect `error.status`
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Re-shape so callers / React Query can read `error.status`
      const normalised = {
        status: error.response.status,
        message: error.response.data?.message ?? error.message,
        data: error.response.data
      };
      return Promise.reject(normalised);
    }
    return Promise.reject(error);
  }
);

export default api;
