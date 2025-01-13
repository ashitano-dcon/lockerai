'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react';
import { InAppHeader as InAppHeaderPresenter } from './in-app-header.presenter';

export type HeaderProps = Omit<ComponentPropsWithoutRef<typeof InAppHeaderPresenter>, 'className'>;

export const InAppHeader = ({ user: initialUser, ...props }: HeaderProps): ReactNode => {
  const [user, setUser] = useState(initialUser);

  const supabase = createClientComponentClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return <InAppHeaderPresenter user={user} {...props} />;
};
