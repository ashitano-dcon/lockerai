'use client';

import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { PartyPopperEmojiIcon } from '@lockerai/core/icon/party-popper-emoji-icon';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';

type ResultDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'>;

export const ResultDialog = ({ ...props }: ResultDialogProps): ReactNode => {
  const t = useTranslations('ResultDialog');
  const tReported = useTranslations('ReportedDialog');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Dialog {...props}>
      <DialogContent variant={{ color: 'green' }}>
        <p className="mt-8 flex flex-col-reverse items-center gap-3 tablet:flex-row">
          <span className="text-center text-3xl font-bold text-sage-12 tablet:text-4xl">
            {t('title').split('authorized')[0]}
            <span className="text-green-11">authorized</span>
            {t('title').split('authorized')[1]}
          </span>
          <PartyPopperEmojiIcon className="h-10 w-auto" />
        </p>
        <p className="text-lg text-sage-11 tablet:text-xl">{t('description')}</p>
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
          {tReported('dashboardButton')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
