import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import { registerUrql } from '@lockerai/urql';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import schema from '~locker-dashboard/graphql.schema.json';

const { getClient } = registerUrql(
  schema,
  getBaseUrl({ app: 'api' }).toString(),
  getBaseUrl({ app: 'api-ws' }).toString(),
  async () => {
    const cookieStore = cookies();

    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return null;
    }

    return [session.access_token, session.expires_at];
  },
  async () => {
    const cookieStore = cookies();

    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const {
      data: { session },
    } = await supabase.auth.refreshSession();
    if (!session) {
      supabase.auth.signOut();
    }
  },
);

export const urqlClient = getClient();
