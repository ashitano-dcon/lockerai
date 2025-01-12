import { Button } from '@lockerai/core/component/button';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SignInButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, 'children' | 'variant'> & {
  loading?: boolean;
};

export const SignInButton = ({ loading, ...props }: SignInButtonProps): ReactNode => (
  <Button
    variant={{
      border: true,
      color: loading ? 'sage' : 'green',
      loading,
    }}
    {...props}
  >
    Sign in
  </Button>
);
