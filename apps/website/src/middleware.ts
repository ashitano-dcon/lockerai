import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { type NextRequest, NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl ミドルウェアを作成
const handleI18n = createMiddleware(routing);

export const middleware = async (request: NextRequest) => {
  // 1. i18n ミドルウェアを実行
  const i18nResponse = handleI18n(request);
  if (!i18nResponse.ok) {
    return i18nResponse;
  }

  // 2. Supabase セッションを取得
  const supabase = createMiddlewareClient({ req: request, res: i18nResponse });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 3. ベースパスを計算（ロケールプレフィックスを除外）
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const locale = segments[1] ?? 'en';
  const basePath = ['en', 'ja'].includes(locale) ? `/${segments.slice(2).join('/')}` : url.pathname;

  // 4. 認証が必要なルートかチェック
  const requireAuthPaths = ['/dashboard', '/report', '/search'];
  const isRequiredAuth = requireAuthPaths.some((path) => basePath.startsWith(path));
  if (isRequiredAuth && !session) {
    // 認証されていない場合はリダイレクト
    return NextResponse.redirect(`${url.origin}?asAuth=true&redirectPathname=${encodeURIComponent(url.pathname)}`);
  }

  return i18nResponse;
};

export const config = {
  // matcher: ['/', '/(en|ja)/:path*'],
  matcher: '/((?!api|auth|_next|_vercel|.*\\..*).*)',
};
