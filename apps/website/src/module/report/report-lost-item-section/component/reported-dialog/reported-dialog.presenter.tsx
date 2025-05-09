'use client';

import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { MemoEmojiIcon } from '@lockerai/core/icon/memo-emoji-icon';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';
import { useRouter } from '#website/i18n/navigation';

type ReportedDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'>;

export const ReportedDialog = ({ ...props }: ReportedDialogProps): ReactNode => {
  const t = useTranslations('ReportedDialog');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Dialog {...props}>
      <DialogContent>
        <p className="flex flex-col-reverse items-center gap-3 text-center text-3xl font-bold text-sage-12 tablet:flex-row tablet:text-left tablet:text-4xl">
          {t('title')}
          <MemoEmojiIcon className="h-10 w-auto" />
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
          {t('dashboardButton')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
