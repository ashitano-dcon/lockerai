import { Image } from '@lockerai/core/component/image';
import { type VariantProps, cn, tv } from '@lockerai/tailwind';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import { UserActionStatusList } from '#website/common/component/user-action-status-list';
import type { CurrentTargetLostItem } from '#website/common/model/lost-item';
import type { User } from '#website/common/model/user';
import { LockerMap } from './locker-map';

const pinnedTaskSectionVariant = tv({
  variants: {
    'lost-and-found-state': {
      DELIVERING: null,
      RETRIEVING: null,
    } satisfies Record<Exclude<User['lostAndFoundState'], 'NONE'>, string | null>,
  },
  slots: {
    beacon: null,
    heading: null,
  },
  compoundSlots: [
    {
      slots: ['beacon'],
      'lost-and-found-state': 'DELIVERING',
      className: 'bg-purple-9 before:bg-purple-9',
    },
    {
      slots: ['beacon'],
      'lost-and-found-state': 'RETRIEVING',
      className: 'bg-cyan-9 before:bg-cyan-9',
    },
    {
      slots: ['heading'],
      'lost-and-found-state': 'DELIVERING',
      className: 'text-purple-11',
    },
    {
      slots: ['heading'],
      'lost-and-found-state': 'RETRIEVING',
      className: 'text-cyan-11',
    },
  ],
});

type PinnedTaskSectionProps = Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'className'> & {
  user: User;
  currentTargetLostItem: CurrentTargetLostItem;
  variant: VariantProps<typeof pinnedTaskSectionVariant>;
};

export const PinnedTaskSection = ({ user, currentTargetLostItem, variant, ...props }: PinnedTaskSectionProps) => {
  const t = useTranslations('PinnedTaskSection');
  const { beacon, heading } = pinnedTaskSectionVariant({ ...variant });
  const stateLowerCase = user.lostAndFoundState.toLowerCase();

  return (
    <section className="flex flex-col items-center gap-10 px-6 py-10 laptop:px-16 laptop:py-12" {...props}>
      <div className="flex flex-col items-center gap-3 laptop:gap-5">
        <h1 className="flex w-fit flex-col items-center gap-6 laptop:flex-row">
          <span className={cn('relative h-6 w-6')}>
            <span
              className={cn(
                'absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full opacity-90 duration-1000',
                'before:absolute before:-left-1/2 before:-top-1/2 before:h-6 before:w-6 before:animate-ping before:rounded-full before:opacity-75',
                beacon(),
              )}
            />
          </span>
          <span className="text-center text-4xl font-bold text-sage-12 laptop:text-5xl">
            {t('currentState', { state: '' })}
            <span className={heading()}>{stateLowerCase}</span>
          </span>
        </h1>
        <p className="max-w-[820px] text-xl text-sage-11 laptop:text-2xl">
          {user.lostAndFoundState === 'DELIVERING' ? t('deliveringInstruction') : t('retrievingInstruction')}
        </p>
      </div>
      <div className="flex flex-col items-center gap-10 laptop:flex-row">
        <figure className="shrink-0">
          <Image
            src={currentTargetLostItem.lostItem.imageUrls[0]!}
            alt={currentTargetLostItem.lostItem.title}
            width={480}
            height={320}
            skeleton={{
              className: 'rounded-2xl',
            }}
            className="max-h-[700px] w-full max-w-[480px] object-cover"
          />
        </figure>
        <div className="flex w-fit shrink flex-col gap-7">
          <hgroup className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-sage-12 laptop:text-3xl">{currentTargetLostItem.lostItem.title}</h2>
            <p className="text-base text-sage-11 laptop:text-lg">{currentTargetLostItem.lostItem.description}</p>
          </hgroup>
          {currentTargetLostItem.drawer && <LockerMap {...currentTargetLostItem.drawer.locker} className="h-[350px] w-full" />}
          <UserActionStatusList
            user={user}
            reporter={currentTargetLostItem.reporter}
            owner={currentTargetLostItem.owner}
            lostItem={currentTargetLostItem.lostItem}
          />
        </div>
      </div>
    </section>
  );
};
