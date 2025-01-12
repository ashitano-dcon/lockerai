'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { signIn } from '#website/common/util/sign-in';
import { SignInDialog as SignInDialogPresenter } from './sign-in-dialog.presenter';

type SignInDialogProps = Omit<ComponentPropsWithoutRef<typeof SignInDialogPresenter>, 'signIn'> & {
  redirectPathname?: string;
};

export const SignInDialog = ({ redirectPathname, ...props }: SignInDialogProps): ReactNode => {
  const supabase = createClientComponentClient();

  return (
    <SignInDialogPresenter
      signIn={async () => {
        await signIn(supabase, redirectPathname ?? '/');
      }}
      {...props}
    />
  );
};
