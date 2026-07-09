import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The backend's optional string fields only skip validation for `undefined`
 * (not `''`) — an empty string still fails their MinLength(1) check. Strip
 * empty-string values before sending an optional-field payload.
 */
export function emptyToUndefined<T extends Record<string, unknown>>(
  obj: T
): { [K in keyof T]: Exclude<T[K], ''> } {
  const result = { ...obj } as { [K in keyof T]: Exclude<T[K], ''> };
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (obj[key] === '') {
      result[key] = undefined as Exclude<T[typeof key], ''>;
    }
  }
  return result;
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}
