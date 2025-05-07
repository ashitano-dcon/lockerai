'use client';

import { toast } from '#core/component/sonner';
import { useChat } from '@ai-sdk/react';
import { type ToolCall } from 'ai';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type FormEvent } from 'react';
import { z } from 'zod';
import { type LostItem } from '#website/common/model/lost-item';
import { type UserPublicMeta } from '#website/common/model/user';
import { type ToolName, type ToolParameters, type ToolResult } from '#website/common/types/chat';
import { findSimilarLostItemUseCase } from '#website/use-case/find-similar-lost-item';
// eslint-disable-next-line no-restricted-imports
import { ChatMessage } from '../chat-message';
// eslint-disable-next-line no-restricted-imports
import { type OnClaim } from '../tool-invocation';

const searchLostItemSchema = z.object({
  description: z.string().describe('The description of the lost item.'),
  date: z.string().describe('The date the item was lost. (e.g., YYYY-MM-DD)'),
});

type SearchLostItemChatProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  onSimilarLostItemFound?: (lostItem: LostItem, reporter: UserPublicMeta | null) => void;
  onClaim?: OnClaim;
};

export const SearchLostItemChat = ({ onSimilarLostItemFound, onClaim, ...props }: SearchLostItemChatProps) => {
  const t = useTranslations('SearchLostItemChat');
  const { status, messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    api: '/api/chat',
    // @ts-expect-error ToolNameはstringよりも狭いから型エラーになってしまう
    onToolCall: async <T extends ToolName>({ toolCall }: { toolCall: ToolCall<T, ToolParameters<T>> }) => {
      const typedToolCall = toolCall as ToolCall<ToolName, ToolParameters<ToolName>>;

      if (typedToolCall.toolName === 'getDateTime') {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZoneName: 'long',
        };
        return { date: new Intl.DateTimeFormat('en-US', options).format(now) } satisfies ToolResult<'getDateTime'>;
      }

      if (typedToolCall.toolName === 'searchLostItem') {
        try {
          const parseResult = searchLostItemSchema.parse(typedToolCall.args);
          const { description, date: dateString } = parseResult;
          const lostAt = new Date(dateString);
          if (Number.isNaN(lostAt.getTime())) {
            throw new Error(`${t('invalidDateFormat')}${dateString}`);
          }
          const result = await findSimilarLostItemUseCase(description, lostAt);
          if (!result) {
            throw new Error(t('noSimilarItemFound'));
          }
          // 修正: returnを削除し、elseを削除
          if (result) {
            onSimilarLostItemFound?.(result.lostItem, result.reporter);
            return {
              lostItem: result.lostItem,
              reporter: result.reporter,
              approveRate: result.approveRate,
              rejectRate: result.rejectRate,
              isAcceptable: result.rejectRate < 0.4, // isAcceptableの条件を修正
            } satisfies ToolResult<'searchLostItem'>;
          }
        } catch (error) {
          return {
            message: String(error),
            isAcceptable: false,
            approveRate: 0,
            rejectRate: 1,
            lostItem: null,
            reporter: null,
          } satisfies ToolResult<'searchLostItem'>;
        }
      }
      return null;
    },
  });

  // LLM応答中でも入力を許可しつつ、送信を制御するためのラップ関数
  const handleSubmitWrapper = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'ready') {
      handleSubmit(e);
    } else {
      toast.error(t('cannotSendWhileResponding'));
    }
  };

  return (
    <div className="relative flex h-full flex-col" {...props}>
      <div className="grow overflow-y-auto">{messages?.map((message) => <ChatMessage key={message.id} message={message} onClaim={onClaim} />)}</div>

      <form
        onSubmit={handleSubmitWrapper}
        className="sticky bottom-4 w-full rounded-[20px] bg-gradient-to-b from-green-6 to-green-7 p-2 shadow-xl shadow-sage-9/10"
      >
        <input
          className="w-full rounded-xl border border-green-6 bg-sage-1 px-4 py-3 text-green-12 focus:outline-green-9 disabled:bg-sage-3 disabled:text-sage-11"
          value={input}
          placeholder={status === 'ready' ? t('inputPlaceholderReady') : t('inputPlaceholderWaiting')}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};
