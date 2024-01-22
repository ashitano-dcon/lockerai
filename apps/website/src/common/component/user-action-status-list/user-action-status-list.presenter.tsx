import { Image } from '@lockerai/core/component/image';
import { DotIcon } from '@lockerai/core/icon/dot-icon';
import { formatDate } from '@lockerai/core/util/format-date';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LostItem } from '#website/common/model/lost-item';
import type { User, UserPublicMeta } from '#website/common/model/user';

type UserActionStatusListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'> & {
  user?: User;
  reporter: UserPublicMeta;
  owner: UserPublicMeta | null;
  lostItem: LostItem;
};

export const UserActionStatusList = ({ user, reporter, owner, lostItem, ...props }: UserActionStatusListProps): ReactNode => (
  <div className="flex flex-col gap-4" {...props}>
    <div className="flex items-center gap-3">
      <Image
        src={reporter.avatarUrl}
        alt=""
        width={36}
        height={36}
        priority
        skeleton={{
          className: 'rounded-full',
        }}
        className="h-9 w-9"
      />
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-sage-12">
          {reporter.name}
          {reporter.id === user?.id ? <span className="text-sage-11"> (You)</span> : null}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-base text-sage-11">{formatDate(lostItem.reportedAt, 'MMM. dd, yyyy HH:mm')} reported</p>
          {lostItem.deliveredAt && (
            <>
              <DotIcon className="h-4 w-4 fill-sage-11" />
              <p className="text-base text-sage-11">{formatDate(lostItem.deliveredAt, 'MMM. dd, yyyy HH:mm')} delivered</p>
            </>
          )}
        </div>
      </div>
    </div>
    {owner && lostItem.ownedAt && (
      <div className="flex items-center gap-3" {...props}>
        <Image
          src={owner.avatarUrl}
          alt=""
          width={36}
          height={36}
          priority
          skeleton={{
            className: 'rounded-full',
          }}
          className="h-9 w-9"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-sage-12">
            {owner.name}
            {owner.id === user?.id ? <span className="text-sage-11"> (You)</span> : null}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-base text-sage-11">{formatDate(lostItem.ownedAt, 'MMM. dd, yyyy HH:mm')} owned</p>
            {lostItem.retrievedAt && (
              <>
                <DotIcon className="h-4 w-4 fill-sage-11" />
                <p className="text-base text-sage-11">{formatDate(lostItem.retrievedAt, 'MMM. dd, yyyy HH:mm')} retrieved</p>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);
