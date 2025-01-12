import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { type NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const requestUrl = new URL(request.url);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createMiddlewareClient({ req: request, res: response });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const requireAuthPaths = ['/dashboard', '/report', '/search'];
  const isRequiredAuth = requireAuthPaths.some((path) => requestUrl.pathname.startsWith(path));
  if (isRequiredAuth && !session) {
    return NextResponse.redirect(`${requestUrl.origin}?asAuth=true&redirectPathname=${encodeURIComponent(requestUrl.pathname)}`);
  }

  return response;
};
