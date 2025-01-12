import { getBaseUrl } from '@lockerai/core/util/get-base-url';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';

export const signIn = async (supabase: SupabaseClient, redirectPathname: string) =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${getBaseUrl({ app: 'website' }).toString()}/auth/callback?redirectPathname=${encodeURIComponent(redirectPathname ?? '/')}`,
    },
  });
