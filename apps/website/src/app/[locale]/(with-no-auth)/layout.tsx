import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { NextPage } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import { Header } from '#website/layout/global/header';
import { findUserUseCase } from '#website/use-case/find-user';

type WithNoAuthLayoutProps = {
  children: ReactNode;
};

const WithNoAuthLayout: NextPage<WithNoAuthLayoutProps> = async ({ children }) => {
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
      <Header user={foundUser} />
      {children}
    </>
  );
};

export default WithNoAuthLayout;
