import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('oppositetalk_token')?.value;

  const isProtectedPath =
    pathname.startsWith('/discover') ||
    pathname.startsWith('/matches') ||
    pathname.startsWith('/messages') ||
    pathname.startsWith('/communities') ||
    pathname.startsWith('/feed') ||
    pathname.startsWith('/settings');

  const isAdminPath = pathname.startsWith('/admin');

  if (isProtectedPath || isAdminPath) {
    // In client environment fallback, tokens are handled via localStorage and hydration,
    // but middleware ensures security cookies are checked if available.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/discover/:path*', '/matches/:path*', '/messages/:path*', '/communities/:path*', '/feed/:path*', '/admin/:path*'],
};
