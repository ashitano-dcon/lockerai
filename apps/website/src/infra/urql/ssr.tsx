'use client';

import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import { createUrqlClient } from '@lockerai/urql';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UrqlProvider as UrqlProviderPrimitive } from '@urql/next';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import schema from '~website/graphql.schema.json';

const { urqlClient, ssr } = createUrqlClient(
  schema,
  getBaseUrl({ app: 'api' }).toString(),
  getBaseUrl({ app: 'api-ws' }).toString(),
  async () => {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return null;
    }

    return [session.access_token, session.expires_at];
  },
  async () => {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.refreshSession();
    if (!session) {
      await supabase.auth.signOut();
      return null;
    }

    return [session.access_token, session.expires_at];
  },
);

type UrqlProviderProps = Omit<ComponentPropsWithoutRef<typeof UrqlProviderPrimitive>, 'client' | 'ssr'>;

export const UrqlProvider = ({ children, ...props }: UrqlProviderProps): ReactNode => (
  <UrqlProviderPrimitive client={urqlClient} ssr={ssr} {...props}>
    {children}
  </UrqlProviderPrimitive>
);
