'use client';

import { useChat } from '@ai-sdk/react';
import { type ToolCall } from 'ai';
import { type ComponentPropsWithoutRef } from 'react';
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
  const { messages, input, handleInputChange, handleSubmit } = useChat({
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
        const parseResult = searchLostItemSchema.safeParse(typedToolCall.args);

        if (!parseResult.success) {
          return `Error: Invalid arguments received for searchLostItem tool. ${parseResult.error.message}`;
        }
        const { description, date: dateString } = parseResult.data;
        try {
          const lostAt = new Date(dateString);
          if (Number.isNaN(lostAt.getTime())) {
            return `Error: Invalid date format provided: ${dateString}`;
          }
          const apiResult = await findSimilarLostItemUseCase(description, lostAt);
          // 修正: returnを削除し、elseを削除
          if (apiResult) {
            onSimilarLostItemFound?.(apiResult.lostItem, apiResult.reporter);
            return {
              lostItem: apiResult.lostItem,
              reporter: apiResult.reporter,
              approveRate: apiResult.approveRate,
              rejectRate: apiResult.rejectRate,
              isAcceptable: apiResult.rejectRate < 0.4, // isAcceptableの条件を修正
            } satisfies ToolResult<'searchLostItem'>;
          }
        } catch (error) {
          return error;
        }
      }
      return null;
    },
  });

  return (
    <div className="relative flex h-full flex-col" {...props}>
      <div className="grow overflow-y-auto">{messages?.map((message) => <ChatMessage key={message.id} message={message} onClaim={onClaim} />)}</div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-4 w-full rounded-[20px] bg-gradient-to-b from-green-6 to-green-7 p-2 shadow-xl shadow-sage-9/10"
      >
        <input
          className="w-full rounded-xl border border-green-6 bg-sage-1 px-4 py-3 text-green-12 focus:outline-green-9"
          value={input}
          placeholder="遺失物の特徴や状況を入力してください..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};
