'use client';

import { toast } from '#core/component/sonner';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, useCallback, useState } from 'react';
import type { User } from '#website/common/model/user';
import { ownLostItemUseCase } from '#website/use-case/own-lost-item';
import { ResultDialog } from './component/result-dialog';
import { SearchLostItemChat } from './component/search-lost-item-chat';

type SearchLostItemSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  user: User;
};

export const SearchLostItemSection = ({ user, ...props }: SearchLostItemSectionProps) => {
  const t = useTranslations('SearchLostItemSection');
  const [isResultDialogOpen, setResultDialogOpen] = useState<boolean>();
  const handleClaim = useCallback(
    async ({ lostItemId }: { lostItemId: string }) => {
      try {
        await ownLostItemUseCase(lostItemId, user.authId);
        setResultDialogOpen(true);
      } catch (error) {
        toast.error(`${t('claimErrorToast')}${error}`);
      }
    },
    [user.authId, t],
  );
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-10 tablet:gap-16" {...props}>
      <hgroup className="mr-auto flex w-full flex-col gap-2">
        <h1 className="w-full text-4xl font-bold text-sage-12 tablet:text-6xl">{t('title')}</h1>
        <p className="w-full text-lg text-sage-11 tablet:text-2xl">{t('description')}</p>
      </hgroup>
      <SearchLostItemChat className="w-full" onClaim={handleClaim} />
      <ResultDialog open={isResultDialogOpen} onOpenChange={setResultDialogOpen} />
    </section>
  );
};
