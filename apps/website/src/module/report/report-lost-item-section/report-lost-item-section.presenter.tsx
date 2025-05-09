'use client';

import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import type { User } from '#website/common/model/user';
import { useUseReportLostItemUseCase } from '#website/use-case/report-lost-item/hook';
import { ReportLostItemForm } from './component/report-lost-item-form';
import { ReportedDialog } from './component/reported-dialog';

type ReportLostItemSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  user: User;
};

export const ReportLostItemSection = ({ user, ...props }: ReportLostItemSectionProps) => {
  const t = useTranslations('ReportLostItemSection');
  const [reportedLostItem, reportLostItem] = useUseReportLostItemUseCase();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (reportedLostItem) {
      setOpen(true);
    }
  }, [reportedLostItem]);

  return (
    <section className="flex flex-col gap-16 px-6 py-10 tablet:px-32 tablet:py-16" {...props}>
      <hgroup className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-sage-12 tablet:text-6xl">{t('title')}</h1>
        <p className="text-lg text-sage-11 tablet:text-2xl">{t('description')}</p>
      </hgroup>
      <ReportLostItemForm
        reportLostItem={async (imageFiles) => {
          await reportLostItem({
            imageFiles,
            reporterId: user.id,
          });
        }}
      />
      <ReportedDialog open={open} onOpenChange={setOpen} />
    </section>
  );
};
