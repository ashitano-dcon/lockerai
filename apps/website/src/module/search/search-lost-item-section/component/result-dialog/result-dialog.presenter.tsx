'use client';

import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { PartyPopperEmojiIcon } from '@lockerai/core/icon/party-popper-emoji-icon';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';

type ResultDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'>;

export const ResultDialog = ({ ...props }: ResultDialogProps): ReactNode => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Dialog {...props}>
      <DialogContent variant={{ color: 'green' }}>
        <p className="mt-8 flex flex-col-reverse items-center gap-3 tablet:flex-row">
          <span className="text-center text-3xl font-bold text-sage-12 tablet:text-4xl">
            You are <span className="text-green-11">authorized</span> as owner!
          </span>
          <PartyPopperEmojiIcon className="h-10 w-auto" />
        </p>
        <p className="text-lg text-sage-11 tablet:text-xl">
          You are now authorized as the owner of this lost item.
          <br />
          Please go to the nearest locker and retrieve the lost item.
        </p>
        <Button
          disabled={loading}
          variant={{
            color: loading ? 'sage' : 'green',
            border: true,
            loading,
          }}
          onClick={() => {
            setLoading(true);
            router.push('/dashboard');
          }}
        >
          Go Dashboard
        </Button>
      </DialogContent>
    </Dialog>
  );
};
