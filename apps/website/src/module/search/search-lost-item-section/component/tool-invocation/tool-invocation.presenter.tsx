import { Button } from '@lockerai/core/component/button';
import { Image } from '@lockerai/core/component/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { UserActionStatusList } from '#website/common/component/user-action-status-list';
import { type ToolInvocationType, type ToolName, type ToolParameters, type ToolResult } from '#website/common/types/chat';
import { pickI18nText } from '#website/i18n/locales';
import { LockerMap } from '~website/src/module/dashboard/pinned-task-section/locker-map';

export type OnClaim = ({ lostItemId }: { lostItemId: string }) => Promise<void>;

const ClaimButton = ({ lostItemId, onClaim }: { lostItemId: string; onClaim?: OnClaim }) => {
  const t = useTranslations('ToolInvocation');
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    setLoading(true);
    await onClaim?.({ lostItemId });
    setLoading(false);
  }, [lostItemId, onClaim]);
  return (
    <Button
      disabled={loading}
      variant={{
        color: 'green',
        border: true,
        loading,
      }}
      onClick={handleClick}
    >
      {t('claimButton')}
    </Button>
  );
};

type ToolInvocationProps<T extends ToolName> = {
  type: 'tool-invocation';
  toolInvocation: ToolInvocationType<T>;
  onResult?: (toolCallId: string, result: string) => void;
  onClaim?: OnClaim;
};

export const ToolInvocation = <T extends ToolName>({ toolInvocation, onClaim }: ToolInvocationProps<T>) => {
  const t = useTranslations('ToolInvocation');
  const locale = useLocale();
  const { toolName, state } = toolInvocation;

  if (toolName === 'getDateTime') {
    const result = toolInvocation.result as ToolResult<'getDateTime'>;
    switch (state) {
      case 'call':
        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
            {t('gettingDateTime')}
          </div>
        );
      case 'result': {
        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
            {t('currentDateTime', { date: result.date ?? '' })}
          </div>
        );
      }
      default:
        return null;
    }
  }

  if (toolName === 'searchLostItem') {
    const args = toolInvocation.args as ToolParameters<'searchLostItem'>;
    const result = toolInvocation.result as ToolResult<'searchLostItem'>;
    switch (state) {
      case 'partial-call':
      case 'call':
        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
            {t('searchingLostItem', { description: args.description, date: args.date })}
          </div>
        );
      case 'result': {
        const { lostItem, reporter, approveRate, rejectRate, isAcceptable } = result;
        if (!lostItem) {
          return (
            <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
              {t('noSimilarItemFoundDetailed', { description: args.description, date: args.date, message: result.message ?? '' })}
            </div>
          );
        }

        const { imageUrls, title, description, titleI18n, descriptionI18n } = lostItem;

        const titleI18nText = pickI18nText(titleI18n, locale, title);

        const descriptionI18nText = pickI18nText(descriptionI18n, locale, description);

        const approvePercentage = Math.round(approveRate * 100);
        const rejectPercentage = Math.round(rejectRate * 100);

        if (!isAcceptable) {
          return (
            <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-4 desktop:flex-col">
              <span className="text-sm text-sage-11">{t('possiblyYours', { description: args.description, date: args.date })}</span>
              <div className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-sage-4 p-3">
                <p className="text-sm font-bold text-sage-12">{t('aiMatchResult')}</p>
                <div className="flex h-4 w-full rounded-xl bg-sage-5">
                  <div
                    className="flex h-full items-center justify-center rounded-l-full bg-gradient-to-t from-green-9 to-green-8 shadow-xl shadow-green-11/20"
                    style={{ width: `${approvePercentage}%` }}
                  ></div>
                  <div
                    className="flex h-full items-center justify-center rounded-r-full bg-gradient-to-t from-red-9 to-red-8 shadow-xl shadow-red-11/20"
                    style={{ width: `${rejectPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-green-11">
                    {t('accept')} <span className="rounded bg-green-3 px-2 text-sm font-bold text-green-12">{approvePercentage}%</span>
                  </p>
                  <p className="text-sm text-red-11">
                    {t('reject')} <span className="rounded bg-red-3 px-2 text-sm font-bold text-red-12">{rejectPercentage}%</span>
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="-mx-3 my-2 flex w-[calc(100%+1.5rem)] flex-col items-center gap-4 rounded-xl bg-sage-3 p-4 tablet:mx-0 tablet:w-full desktop:flex-col">
            <div className="flex w-full flex-col items-center gap-6 desktop:flex-row desktop:gap-10">
              <figure className="shrink-0">
                <Image
                  src={imageUrls[0]!}
                  alt={titleI18nText}
                  width={480}
                  height={320}
                  sizes="(min-width: 480px) 30vw, 480px"
                  skeleton={{
                    className: 'rounded-2xl',
                  }}
                  className="w-full max-w-[300px] object-cover"
                />
              </figure>
              <div className="flex w-fit shrink flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-sage-11">{t('mostSimilarItem', { description: args.description, date: args.date })}</p>
                  <p className="text-xl font-bold text-sage-12 tablet:text-2xl">{titleI18nText}</p>
                  <p className="text-sm text-sage-11">{descriptionI18nText}</p>
                  {lostItem.drawer && (
                    <LockerMap
                      lat={lostItem.drawer.locker.lat}
                      lng={lostItem.drawer.locker.lng}
                      location={lostItem.drawer.locker.location}
                      locationI18n={lostItem.drawer.locker.locationI18n}
                      defaultZoom={12}
                      className="h-[300px] w-full"
                    />
                  )}

                  <div className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-sage-4 p-3">
                    <p className="text-sm font-bold text-sage-12">{t('aiMatchResult')}</p>
                    <div className="flex h-4 w-full rounded-xl bg-sage-5">
                      <div
                        className="flex h-full items-center justify-center rounded-l-full bg-gradient-to-t from-green-9 to-green-8 shadow-xl shadow-green-11/20"
                        style={{ width: `${approvePercentage}%` }}
                      ></div>
                      <div
                        className="flex h-full items-center justify-center rounded-r-full bg-gradient-to-t from-red-9 to-red-8 shadow-xl shadow-red-11/20"
                        style={{ width: `${rejectPercentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-green-11">
                        {t('accept')} <span className="rounded bg-green-3 px-2 text-sm font-bold text-green-12">{approvePercentage}%</span>
                      </p>
                      <p className="text-sm text-red-11">
                        {t('reject')} <span className="rounded bg-red-3 px-2 text-sm font-bold text-red-12">{rejectPercentage}%</span>
                      </p>
                    </div>
                  </div>
                </div>
                {reporter && <UserActionStatusList reporter={reporter} owner={null} lostItem={lostItem} />}
                <ClaimButton lostItemId={lostItem.id} onClaim={onClaim} />
              </div>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  }

  return null;
};
