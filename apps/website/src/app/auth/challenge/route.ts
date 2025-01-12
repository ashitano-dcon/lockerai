import { getBaseUrl } from '#core/util/get-base-url';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { relateFingerprintWithUserUseCase } from '#website/use-case/relate-fingerprint-with-user';
import { clearLockerChallengeUseCase } from '~website/src/use-case/clear-locker-challenge';

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();

  const requestUrl = new URL(request.url);

  const lockerId = requestUrl.searchParams.get('lockerId');
  const hashedFingerprintId = requestUrl.searchParams.get('hashedFingerprintId');
  if (!lockerId || !hashedFingerprintId) {
    return NextResponse.redirect(getBaseUrl({ app: 'website' }));
  }

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return NextResponse.redirect(
      `${getBaseUrl({ app: 'website' })}?asAuth=true&redirectPathname=${encodeURIComponent(requestUrl.pathname + requestUrl.search)}`,
    );
  }

  if (!user) {
    return NextResponse.redirect(
      `${getBaseUrl({ app: 'website' })}?asAuth=true&redirectPathname=${encodeURIComponent(requestUrl.pathname + requestUrl.search)}`,
    );
  }

  const relatedUser = await relateFingerprintWithUserUseCase(user.id, hashedFingerprintId).catch(() => null);
  if (!relatedUser) {
    return NextResponse.redirect(getBaseUrl({ app: 'website' }));
  }

  if ((await clearLockerChallengeUseCase(lockerId).catch(() => null)) === null) {
    return NextResponse.redirect(getBaseUrl({ app: 'website' }));
  }

  return NextResponse.redirect(`${getBaseUrl({ app: 'website' })}?asRelateResult=true`);
};
