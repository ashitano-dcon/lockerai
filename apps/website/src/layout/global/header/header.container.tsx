'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname } from 'next/navigation';
import { type ComponentPropsWithoutRef, type ReactNode, useEffect, useState } from 'react';
import { Header as HeaderPresenter } from './header.presenter';

export type HeaderProps = Omit<ComponentPropsWithoutRef<typeof HeaderPresenter>, 'className' | 'variant'>;

export const Header = ({ user: initialUser, ...props }: HeaderProps): ReactNode => {
  const [user, setUser] = useState(initialUser);
  const pathname = usePathname();

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

  return (
    <HeaderPresenter
      user={user}
      variant={{
        'hidden-navigation': pathname === '/',
      }}
      {...props}
    />
  );
};
