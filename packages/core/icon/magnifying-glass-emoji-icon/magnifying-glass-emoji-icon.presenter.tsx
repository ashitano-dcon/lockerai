import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type MagnifyingGlassEmojiIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const MagnifyingGlassEmojiIcon = ({ ...props }: MagnifyingGlassEmojiIconProps): ReactNode => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M27.3881 24.642L24.5601 27.47L19.6101 22.52L22.4381 19.692L27.3881 24.642Z" fill="#9AAAB4" />
    <path
      d="M34.683 29.11L28.804 23.231C28.023 22.45 26.757 22.45 25.976 23.231L23.148 26.059C22.367 26.84 22.367 28.106 23.148 28.887L29.027 34.766C30.589 36.329 33.123 36.329 34.685 34.766C36.245 33.205 36.244 30.672 34.683 29.11Z"
      fill="#66757F"
    />
    <path
      d="M13.5859 27.1689C21.0418 27.1689 27.0859 21.1248 27.0859 13.6689C27.0859 6.2131 21.0418 0.168945 13.5859 0.168945C6.13009 0.168945 0.0859375 6.2131 0.0859375 13.6689C0.0859375 21.1248 6.13009 27.1689 13.5859 27.1689Z"
      fill="#8899A6"
    />
    <path
      d="M13.5859 23.1689C18.8326 23.1689 23.0859 18.9157 23.0859 13.6689C23.0859 8.42224 18.8326 4.16895 13.5859 4.16895C8.33923 4.16895 4.08594 8.42224 4.08594 13.6689C4.08594 18.9157 8.33923 23.1689 13.5859 23.1689Z"
      fill="#BBDDF5"
    />
  </svg>
);
