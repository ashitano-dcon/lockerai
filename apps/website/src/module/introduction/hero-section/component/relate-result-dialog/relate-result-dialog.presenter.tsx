'use client';

import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { LinkEmojiIcon } from '@lockerai/core/icon/link-emoji-icon';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type RelateResultDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'>;

export const RelateResultDialog = ({ defaultOpen, ...props }: RelateResultDialogProps): ReactNode => (
  <Dialog {...props}>
    <DialogContent>
      <p className="flex flex-col-reverse items-center gap-3 tablet:mt-8 tablet:flex-row">
        <span className="text-center text-3xl font-bold text-sage-12 tablet:text-4xl">Linking fingerprint successful!</span>
        <LinkEmojiIcon className="h-10 w-auto" />
      </p>
      <p className="text-lg text-sage-11 tablet:text-xl">
        Now your fingerprint is linked to your account.
        <br />
        Please scan your fingerprint again to unlock the door.
      </p>
    </DialogContent>
  </Dialog>
);
