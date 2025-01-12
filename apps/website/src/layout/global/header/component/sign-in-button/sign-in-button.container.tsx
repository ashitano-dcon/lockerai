'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';
import { signIn } from '#website/common/util/sign-in';
import { SignInButton as SignInButtonPresenter } from './sign-in-button.presenter';

type SignInButtonProps = Omit<ComponentPropsWithoutRef<typeof SignInButtonPresenter>, 'children' | 'onClick'>;

export const SignInButton = ({ ...props }: SignInButtonProps): ReactNode => {
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  return (
    <SignInButtonPresenter
      loading={loading}
      onClick={async () => {
        setLoading(true);
        await signIn(supabase, '/dashboard');
      }}
      {...props}
    />
  );
};
