'use client';

import { Button } from '#core/component/button';
import { Dialog, DialogContent, DialogTrigger } from '#core/component/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { User } from '#website/common/model/user';

type UserQrcodeDialogProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  user: Pick<User, 'id' | 'name'>;
};

export const UserQrcodeDialog = ({ user, ...props }: UserQrcodeDialogProps): ReactNode => (
  <Dialog>
    <DialogTrigger>
      <Button
        variant={{
          border: true,
          color: 'sage',
        }}
        {...props}
      >
        QR Code
      </Button>
    </DialogTrigger>
    <DialogContent>
      <div className="flex w-full flex-1 flex-col items-center justify-center">
        <QRCodeSVG value={user.id} includeMargin className="aspect-square" size={300} bgColor="#fbfdfc" fgColor="#111c18" />
        <p className="font-sans text-sm font-bold text-sage-11">{user.name}</p>
      </div>
    </DialogContent>
  </Dialog>
);
