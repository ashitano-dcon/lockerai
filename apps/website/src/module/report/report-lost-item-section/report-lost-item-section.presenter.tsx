'use client';

import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import type { User } from '#website/common/model/user';
import { useUseReportLostItemUseCase } from '#website/use-case/report-lost-item/hook';
import { ReportLostItemForm } from './component/report-lost-item-form';
import { ReportedDialog } from './component/reported-dialog';

type ReportLostItemSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  user: User;
};

export const ReportLostItemSection = ({ user, ...props }: ReportLostItemSectionProps) => {
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
        <h1 className="text-4xl font-bold text-sage-12 tablet:text-6xl">Report</h1>
        <p className="text-lg text-sage-11 tablet:text-2xl">Take photos of the lost item and report to it.</p>
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
