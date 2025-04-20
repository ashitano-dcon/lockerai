import { marked } from 'marked';
import { type ComponentPropsWithoutRef, memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

// Markdown テキストをブロックに分割する関数
function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

// 個々の Markdown ブロックをメモ化するコンポーネント
const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => (
    // ここで ReactMarkdown を使ってレンダリング
    // className は components プロパティで指定する
    <ReactMarkdown
      components={{
        // ルート要素 (div) にクラスを適用 (children も渡す)
        div: ({ children, ...props }: ComponentPropsWithoutRef<'div'>) => (
          <div {...props} className="prose prose-sm max-w-none">
            {children}
          </div>
        ),
        // a: リンクを新しいタブで開く
        a: ({ children, ...props }: ComponentPropsWithoutRef<'a'>) => (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        // p: 段落下のマージン調整
        p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
          <p {...props} className="mb-1">
            {children}
          </p>
        ),
        // li: リストアイテム下のマージン調整
        li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => <li {...props}>{children}</li>,
        // strong: スタイル適用 (children も渡す)
        strong: ({ children, ...props }: ComponentPropsWithoutRef<'strong'>) => (
          <strong {...props} className="font-bold">
            {children}
          </strong>
        ),
        // em (イタリック) にスタイル適用 (children も渡す)
        em: ({ children, ...props }: ComponentPropsWithoutRef<'em'>) => (
          <em {...props} className="italic">
            {children}
          </em>
        ),
        // ul/ol: スタイル調整 (children も渡す) - my-1 を削除
        ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
          <ul {...props} className="list-inside list-disc">
            {children}
          </ul>
        ),
        ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
          <ol {...props} className="list-inside list-decimal">
            {children}
          </ol>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  ),
  // content が変更された場合のみ再レンダリング
  (prevProps, nextProps) => prevProps.content === nextProps.content,
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

// Markdown 全体をブロックに分割し、各ブロックをメモ化してレンダリングするコンポーネント
export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  // content が変更された場合のみブロック分割を再計算
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  // 各ブロックを MemoizedMarkdownBlock でレンダリング
  return blocks.map((block, index) => <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />);
});

MemoizedMarkdown.displayName = 'MemoizedMarkdown';
