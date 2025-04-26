import { z } from 'zod';

export const tools = {
  askForConfirmation: {
    description: 'Ask the user for confirmation.',
    parameters: z.object({
      message: z.string().describe('The message to ask for confirmation.'),
    }),
    result: z.object({
      confirmation: z.boolean().describe("The user's confirmation."),
    }),
  },
  searchLostItem: {
    description: 'Search for a lost item in the database.',
    parameters: z.object({
      description: z.string().describe('The description of the lost item in English.'),
      date: z.string().describe('The date the item was lost. (e.g., YYYY-MM-DD)'), // 日付形式の例を追記
    }),
    result: z.object({
      message: z.string().optional().describe('The message to the chat ai.'),
      lostItem: z
        .object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          imageUrls: z.array(z.string()),
          reportedAt: z.date(),
          deliveredAt: z.date().nullable(),
          ownedAt: z.date().nullable(),
          retrievedAt: z.date().nullable(),
        })
        .nullable(),
      reporter: z
        .object({
          id: z.string(),
          name: z.string(),
          avatarUrl: z.string(),
          isDiscloseAsOwner: z.boolean(),
        })
        .nullable(),
      approveRate: z.number().describe('The approval rate of the matching algorithm.'),
      rejectRate: z.number().describe('The rejection rate of the matching algorithm.'),
      isAcceptable: z.boolean().describe('Whether the input is descriptive enough to return the item to the user or not.'),
    }),
  },
  getDateTime: {
    description: 'Get the current date and time.',
    parameters: z.object({}),
    result: z.object({
      date: z.string().describe('The current date and time.'),
    }),
  },
};

export type Tools = typeof tools;
export type ToolName = keyof Tools;
export type ToolParameters<T extends ToolName> = z.infer<Tools[T]['parameters']>;
export type ToolResult<T extends ToolName> = z.infer<Tools[T]['result']>;

// toolInvocationプロップの型
export type ToolInvocationType<T extends ToolName = ToolName> = {
  toolCallId: string;
  toolName: T | string;
  args: ToolParameters<T>;
  state: 'call' | 'result' | 'partial-call' | 'error';
  result?: ToolResult<T>;
};
