'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

export const AuthGuardProvider = (): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session === null) {
        setTimeout(() => {
          router.replace(`/?asAuth=true&redirectPathname=${encodeURIComponent(pathname)}`);
        }, 0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase.auth]);

  return null;
};
