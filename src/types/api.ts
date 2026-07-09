// Mirrors the backend's common response envelopes (see w-traders-backend
// src/common/dto/page.dto.ts, page-meta.dto.ts and the default Nest exception
// filters). Keep these in sync manually — the backend doesn't publish a
// generated client.

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface Page<T> {
  data: T[];
  meta: PageMeta;
}

export interface PageOptions {
  page?: number;
  limit?: number;
}

// Shape produced by src/lib/axios.ts's response interceptor for every
// rejected request — `status` is what React Query's retry/error handling
// (see src/provider/query-provider.tsx) keys off of.
export interface ApiError {
  status: number;
  message: string;
  data: unknown;
}
