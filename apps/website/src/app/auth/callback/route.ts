import { getBaseUrl } from '#core/util/get-base-url';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { createUserUseCase } from '#website/use-case/create-user';
import { verifyUserExistenceUseCase } from '#website/use-case/verify-user-existence';

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(getBaseUrl({ app: 'website' }));
  }
  const redirectPathname = requestUrl.searchParams.get('redirectPathname');

  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const {
    data: { user },
    error,
  } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(getBaseUrl({ app: 'website' }));
  }

  if (user) {
    const { isExist } = await verifyUserExistenceUseCase(user.id);
    if (!isExist && user.email) {
      await createUserUseCase({
        authId: user.id,
        name: user.user_metadata['full_name'],
        email: user.user_metadata['email'],
        avatarUrl: user.user_metadata['avatar_url'],
      });
    }
  }

  return NextResponse.redirect(`${getBaseUrl({ app: 'website' })}/${decodeURIComponent(redirectPathname ?? '/')}`);
};
