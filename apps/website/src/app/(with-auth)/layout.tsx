import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import { AuthGuardProvider } from '#website/layout/with-auth/auth-guard-provider';

type WithAuthLayoutProps = {
  children: ReactNode;
};

const WithAuthLayout: NextPage<WithAuthLayoutProps> = ({ children }) => (
  <>
    <AuthGuardProvider />
    {children}
  </>
);

export default WithAuthLayout;
