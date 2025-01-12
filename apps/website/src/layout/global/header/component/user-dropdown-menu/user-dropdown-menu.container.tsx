'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { UserDropdownMenu as UserDropdownMenuPresenter } from './user-dropdown-menu.presenter';

type UserDropdownMenuProps = Omit<ComponentPropsWithoutRef<typeof UserDropdownMenuPresenter>, 'signOut'>;

export const UserDropdownMenu = ({ ...props }: UserDropdownMenuProps): ReactNode => {
  const supabase = createClientComponentClient();

  return (
    <UserDropdownMenuPresenter
      signOut={async () => {
        await supabase.auth.signOut();
      }}
      {...props}
    />
  );
};
