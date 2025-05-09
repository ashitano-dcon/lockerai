import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { InAppHeader } from '#website/layout/global/header';
import { AuthGuardProvider } from '#website/layout/with-auth/auth-guard-provider';
import { findUserUseCase } from '#website/use-case/find-user';

type WithAuthLayoutProps = {
  children: ReactNode;
  routeIndicator: ReactNode;
};

const WithAuthLayout: NextPage<WithAuthLayoutProps> = async ({ children, routeIndicator }) => {
  // HACK: To avoid next build errors, functions that depend on async contexts need to be called outside the function that creates the new execution context.
  // ref: https://nextjs.org/docs/messages/dynamic-server-error
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const foundUser = user && (await findUserUseCase(user.id));

  return (
    <>
      <InAppHeader user={foundUser}>{routeIndicator}</InAppHeader>
      <AuthGuardProvider />
      {children}
    </>
  );
};

export default WithAuthLayout;
