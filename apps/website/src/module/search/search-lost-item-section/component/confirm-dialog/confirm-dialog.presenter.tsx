'use client';

import { Button } from '@lockerai/core/component/button';
import { Dialog, DialogContent } from '@lockerai/core/component/dialog';
import { Image } from '@lockerai/core/component/image';
import { MagnifyingGlassEmojiIcon } from '@lockerai/core/icon/magnifying-glass-emoji-icon';
import { type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';
import { UserActionStatusList } from '#website/common/component/user-action-status-list';
import type { LostItem } from '#website/common/model/lost-item';
import type { User, UserPublicMeta } from '#website/common/model/user';
import { ownLostItemUseCase } from '#website/use-case/own-lost-item';

type ConfirmDialogProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children' | 'className'> & {
  user: User;
  lostItem: LostItem;
  reporter: UserPublicMeta;
  onOwned?: () => void;
};

export const ConfirmDialog = ({ user, lostItem, reporter, onOwned, onOpenChange, ...props }: ConfirmDialogProps): ReactNode => {
  const [loading, setLoading] = useState(false);

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-6">
            <p className="flex items-center gap-3 text-4xl font-bold text-sage-12">
              Similar lost item found!
              <MagnifyingGlassEmojiIcon className="h-10 w-auto" />
            </p>
            <div className="flex w-[80vw] items-center gap-10">
              <figure className="shrink-0">
                <Image
                  src={lostItem.imageUrls[0]!}
                  alt={lostItem.title}
                  width={480}
                  height={320}
                  sizes="(min-width: 480px) 30vw, 480px"
                  skeleton={{
                    className: 'rounded-2xl',
                  }}
                  className="h-[320px] w-[480px] object-cover"
                />
              </figure>
              <div className="flex w-fit shrink flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold text-sage-12">{lostItem.title}</p>
                  <p className="text-lg text-sage-11">{lostItem.description}</p>
                </div>
                <UserActionStatusList reporter={reporter} owner={null} lostItem={lostItem} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-48">
            <Button
              disabled={loading}
              variant={{
                color: 'sage',
                border: true,
              }}
              onClick={() => {
                onOpenChange?.(false);
              }}
            >
              It&apos;s not mine
            </Button>
            <Button
              disabled={loading}
              variant={{
                color: 'green',
                border: true,
                loading,
              }}
              onClick={async () => {
                setLoading(true);
                await ownLostItemUseCase(lostItem.id, user.authId);
                onOwned?.();
                setLoading(false);
              }}
            >
              It&apos;s mine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
