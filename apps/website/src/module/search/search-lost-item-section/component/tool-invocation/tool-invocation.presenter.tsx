import { Button } from '@lockerai/core/component/button';
import { Image } from '@lockerai/core/component/image';
import { useCallback, useState } from 'react';
import { UserActionStatusList } from '#website/common/component/user-action-status-list';
import { type ToolInvocationType, type ToolName, type ToolParameters, type ToolResult } from '#website/common/types/chat';

export type OnClaim = ({ lostItemId }: { lostItemId: string }) => Promise<void>;

const ClaimButton = ({ lostItemId, onClaim }: { lostItemId: string; onClaim?: OnClaim }) => {
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
      It&apos;s mine
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
  const { toolName, state } = toolInvocation;

  if (toolName === 'getDateTime') {
    const result = toolInvocation.result as ToolResult<'getDateTime'>;
    switch (state) {
      case 'call':
        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
            Getting the current date and time...
          </div>
        );
      case 'result': {
        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
            It is {result.date} now.
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
            Searching for the lost item &quot;{args.description}&quot; lost around {args.date}...
          </div>
        );
      case 'result': {
        const { lostItem, reporter, approveRate, rejectRate, isAcceptable } = result;
        if (!lostItem) {
          return (
            <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-2 text-sm italic text-sage-11">
              No items similar to &quot;{args.description}&quot; lost around {args.date} were found. {result.message}
            </div>
          );
        }

        const { imageUrls, title, description } = lostItem;
        const approvePercentage = Math.round(approveRate * 100);
        const rejectPercentage = Math.round(rejectRate * 100);

        if (!isAcceptable) {
          return (
            <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-4 desktop:flex-col">
              <span className="text-sm text-sage-11">
                There is an item that is possiblly yours, similar to &quot;{args.description}&quot; lost around {args.date}.
              </span>
              <div className="mt-2 flex w-full flex-col gap-2 rounded-lg bg-sage-4 p-3">
                <p className="text-sm font-bold text-sage-12">AI Match Result:</p>
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
                    Accept <span className="rounded bg-green-3 px-2 text-sm font-bold text-green-12">{approvePercentage}%</span>
                  </p>
                  <p className="text-sm text-red-11">
                    Reject <span className="rounded bg-red-3 px-2 text-sm font-bold text-red-12">{rejectPercentage}%</span>
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="my-2 flex w-full flex-col items-center gap-4 rounded-xl bg-sage-3 p-4 desktop:flex-col">
            <div className="flex w-full flex-col items-center gap-6 desktop:flex-row desktop:gap-10">
              <figure className="shrink-0">
                <Image
                  src={imageUrls[0]!}
                  alt={title}
                  width={480}
                  height={320}
                  sizes="(min-width: 480px) 30vw, 480px"
                  skeleton={{
                    className: 'rounded-2xl',
                  }}
                  className="w-full object-cover"
                />
              </figure>
              <div className="flex w-fit shrink flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-sage-11">
                    The most similar item to &quot;{args.description}&quot; lost around {args.date}
                  </p>
                  <p className="text-xl font-bold text-sage-12 tablet:text-2xl">{title}</p>
                  <p className="text-base text-sage-11 tablet:text-lg">{description}</p>

                  <div className="mt-2 flex flex-col gap-2 rounded-lg bg-sage-4 p-3">
                    <p className="text-sm font-bold text-sage-12">AI Match Result:</p>
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
                        Accept <span className="rounded bg-green-3 px-2 text-sm font-bold text-green-12">{approvePercentage}%</span>
                      </p>
                      <p className="text-sm text-red-11">
                        Reject <span className="rounded bg-red-3 px-2 text-sm font-bold text-red-12">{rejectPercentage}%</span>
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
