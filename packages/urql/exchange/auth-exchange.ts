import { type AuthConfig, authExchange } from '@urql/exchange-auth';

export const createAuthExchange = (getSession: () => Promise<[string, number | undefined] | null>, refreshSession: () => Promise<void>) =>
  authExchange(async ({ appendHeaders }): Promise<AuthConfig> => {
    const session = await getSession();
    const [accessToken, expiresAt] = [session?.[0], session?.[1]];

    return {
      refreshAuth: refreshSession,
      didAuthError: (error) => error.graphQLErrors.some((e) => e.extensions?.['code'] === 'FORBIDDEN'),
      willAuthError: () => {
        if (expiresAt) {
          const expirationDate = new Date(expiresAt);
          return expirationDate < new Date();
        }

        return !accessToken;
      },
      addAuthToOperation: (operation) => {
        if (!accessToken) {
          return operation;
        }

        return appendHeaders(operation, {
          authorization: `Bearer ${accessToken}`,
        });
      },
    };
  });
