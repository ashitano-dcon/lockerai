import { type AuthConfig, authExchange } from '@urql/exchange-auth';

export const createAuthExchange = (
  getSession: () => Promise<[string, number | undefined] | null>,
  refreshSession: () => Promise<[string, number | undefined] | null>,
) =>
  authExchange(async ({ appendHeaders }): Promise<AuthConfig> => {
    const session = await getSession();
    let [accessToken, expiresAt] = session ?? [];

    return {
      refreshAuth: async () => {
        const newSession = await getSession();

        if (newSession) {
          [accessToken, expiresAt] = newSession;
          return;
        }

        const refreshedSession = await refreshSession();
        [accessToken, expiresAt] = refreshedSession ?? [];
      },
      didAuthError: (error) => {
        const flag = error.graphQLErrors.some((e) => e.extensions?.['code'] === 'FORBIDDEN' || e.extensions?.['code'] === 'UNAUTHENTICATED');
        return flag;
      },
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
