import { type Message } from '@ai-sdk/react';
import { motion } from 'framer-motion';
import { type ComponentPropsWithoutRef } from 'react';
import { MemoizedMarkdown } from '#website/common/component/memoized-markdown/memoized-markdown';
// eslint-disable-next-line no-restricted-imports
import { type OnClaim, ToolInvocation } from '../tool-invocation';

type ChatMessageProps = {
  message: Message;
  onToolResult?: (toolCallId: string, result: string) => void;
  onClaim?: OnClaim;
} & ComponentPropsWithoutRef<'div'>;

const messageVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

export const ChatMessage = ({ message, onToolResult, onClaim }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const writer = isUser ? 'You (An Possible Owner)' : 'Lost and Found AI';

  return (
    <div className={`mb-4 flex overflow-x-hidden ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        className={`rounded-xl border-2 px-4 py-3 leading-relaxed shadow-lg ${isUser ? 'max-w-[80%] border-green-4 bg-gradient-to-t from-green-2 to-green-3 text-green-12 shadow-green-11/10' : 'w-full border-sage-4 bg-gradient-to-b from-sage-1 to-sage-2 text-sage-12 shadow-sage-11/10'}`}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        layout="position"
      >
        <strong className="mb-1 block">{`${writer}`}</strong>
        {message.parts?.map((part, index) => {
          switch (part.type) {
            case 'text':
              return <MemoizedMarkdown key={index} id={`${message.id}-part-${index}`} content={part.text} />;

            case 'tool-invocation':
              return <ToolInvocation key={index} type={part.type} toolInvocation={part.toolInvocation} onResult={onToolResult} onClaim={onClaim} />;

            default:
              return null;
          }
        })}
      </motion.div>
    </div>
  );
};
