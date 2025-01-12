'use client';

import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import type { LostItem } from '#website/common/model/lost-item';
import type { User, UserPublicMeta } from '#website/common/model/user';
import { ConfirmDialog } from './component/confirm-dialog';
import { ResultDialog } from './component/result-dialog';
import { SearchLostItemForm } from './component/search-lost-item-form';

type SearchLostItemSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  user: User;
};

export const SearchLostItemSection = ({ user, ...props }: SearchLostItemSectionProps) => {
  const [similarLostItem, setSimilarLostItem] = useState<LostItem>();
  const [similarLostItemReporter, setSimilarLostItemReporter] = useState<UserPublicMeta>();
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState<boolean>();
  const [isResultDialogOpen, setResultDialogOpen] = useState<boolean>();

  useEffect(() => {
    if (similarLostItem && similarLostItemReporter) {
      setConfirmDialogOpen(true);
    }
  }, [similarLostItem, similarLostItemReporter]);

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-10 tablet:gap-16 tablet:px-32 tablet:py-16" {...props}>
      <hgroup className="mr-auto flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-sage-12 tablet:text-6xl">Search</h1>
        <p className="text-lg text-sage-11 tablet:text-2xl">Enter the description of the lost item and the date and time of loss.</p>
      </hgroup>
      <SearchLostItemForm
        onSimilarLostItemFound={(foundSimilarLostItem, foundSimilarLostItemReporter) => {
          setSimilarLostItem(foundSimilarLostItem);
          setSimilarLostItemReporter(foundSimilarLostItemReporter);
        }}
      />
      {similarLostItem && similarLostItemReporter && (
        <ConfirmDialog
          user={user}
          lostItem={similarLostItem}
          reporter={similarLostItemReporter}
          onOwned={() => {
            setConfirmDialogOpen(false);
            setResultDialogOpen(true);
          }}
          open={isConfirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
        />
      )}
      <ResultDialog open={isResultDialogOpen} onOpenChange={setResultDialogOpen} />
    </section>
  );
};
