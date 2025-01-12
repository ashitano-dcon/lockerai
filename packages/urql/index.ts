import { type Client, cacheExchange, createClient, fetchExchange, ssrExchange } from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import { registerUrql as registerUrqlByMaker } from '@urql/next/rsc';
import { createAuthExchange } from './exchange/auth-exchange';
import { createScalarExchamge } from './exchange/scalar-exchange';
import { createSubscriptionExchange } from './exchange/subscription-exchange';

export const createUrqlClient = (
  schema: unknown,
  graphqlUrl: string,
  wsUrl: string,
  getSession: () => Promise<[string, number | undefined] | null>,
  refreshSession: () => Promise<void>,
) => {
  const ssr = ssrExchange();

  const urqlClient = createClient({
    url: graphqlUrl,
    exchanges: [
      devtoolsExchange,
      createScalarExchamge(schema as Parameters<typeof createScalarExchamge>[0]),
      cacheExchange,
      createAuthExchange(getSession, refreshSession),
      createSubscriptionExchange(wsUrl),
      ssr,
      fetchExchange,
    ],
    suspense: true,
  });

  return { urqlClient, ssr };
};

export const registerUrql = (
  schema: Parameters<typeof createUrqlClient>[0],
  graphqlUrl: Parameters<typeof createUrqlClient>[1],
  wsUrl: Parameters<typeof createUrqlClient>[2],
  getSession: Parameters<typeof createUrqlClient>[3],
  refreshSession: Parameters<typeof createUrqlClient>[4],
) => {
  const { urqlClient } = createUrqlClient(schema, graphqlUrl, wsUrl, getSession, refreshSession);
  const { getClient } = registerUrqlByMaker(() => urqlClient);

  return { getClient };
};

export type { Client as UrqlClient };
