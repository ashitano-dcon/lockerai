'use client';

import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { MemoEmojiIcon } from '@lockerai/core/icon/memo-emoji-icon';
import { useRouter } from 'next/navigation';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';

type ReportedDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'>;

export const ReportedDialog = ({ ...props }: ReportedDialogProps): ReactNode => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Dialog {...props}>
      <DialogContent>
        <p className="flex flex-col-reverse items-center gap-3 text-center text-3xl font-bold text-sage-12 tablet:flex-row tablet:text-left tablet:text-4xl">
          Lost item was reported!
          <MemoEmojiIcon className="h-10 w-auto" />
        </p>
        <p className="text-lg text-sage-11 tablet:text-xl">
          Thank you for your good deed.
          <br />
          Please go to locker and store the lost item in the drawer provided.
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
