import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_TOKEN_COOKIE } from '@/constants/auth';

export function middleware(request: NextRequest) {
  const isAuthenticated = Boolean(
    request.cookies.get(AUTH_TOKEN_COOKIE)?.value
  );
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith('/auth');

  if (!isAuthenticated && !isAuthRoute) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except static assets, Next.js internals, and the
  // Sentry tunnel route (must stay unmatched — see next.config.ts).
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|monitoring|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
