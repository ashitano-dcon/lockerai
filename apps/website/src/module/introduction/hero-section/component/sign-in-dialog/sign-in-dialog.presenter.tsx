'use client';

import { BrandIcon } from '@lockerai/core/component/brand-icon';
import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { GoogleIcon } from '@lockerai/core/icon/google-icon';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';

type SignInDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'> & {
  signIn: () => Promise<void>;
};

export const SignInDialog = ({ signIn, onOpenChange, ...props }: SignInDialogProps): ReactNode => {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2 tablet:flex-row">
          <BrandIcon className="tablet:h-16" />
          <p className="text-center text-4xl font-bold text-sage-12 tablet:text-left tablet:text-5xl">You need to sign in</p>
        </div>
        <p className="text-lg text-sage-11 tablet:text-xl">
          Locker.ai is a service that uses a unique AI-driven authentication mechanism to safely report and retrieve lost items. Sign in to the
          Locker.ai to manage lost items.
        </p>
        <Button
          icon={GoogleIcon}
          onClick={async () => {
            setLoading(true);
            await signIn();
          }}
          variant={{
            border: true,
            color: loading ? 'sage' : 'green',
            loading,
          }}
        >
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};
