import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type MemoEmojiIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const MemoEmojiIcon = ({ ...props }: MemoEmojiIconProps): ReactNode => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M31 32C31 34.209 29.209 36 27 36H5C2.791 36 1 34.209 1 32V4C1 1.791 2.791 0 5 0H27C29.209 0 31 1.791 31 4V32Z" fill="#CCD6DD" />
    <path
      d="M27 24C27 24.553 26.553 25 26 25H6C5.448 25 5 24.553 5 24C5 23.447 5.448 23 6 23H26C26.553 23 27 23.447 27 24ZM11 28C11 28.553 10.552 29 10 29H6C5.448 29 5 28.553 5 28C5 27.447 5.448 27 6 27H10C10.552 27 11 27.447 11 28ZM27 8C27 8.552 26.553 9 26 9H6C5.448 9 5 8.552 5 8C5 7.448 5.448 7 6 7H26C26.553 7 27 7.448 27 8ZM27 12C27 12.553 26.553 13 26 13H6C5.448 13 5 12.553 5 12C5 11.447 5.448 11 6 11H26C26.553 11 27 11.447 27 12ZM27 16C27 16.553 26.553 17 26 17H6C5.448 17 5 16.553 5 16C5 15.447 5.448 15 6 15H26C26.553 15 27 15.447 27 16ZM27 20C27 20.553 26.553 21 26 21H6C5.448 21 5 20.553 5 20C5 19.447 5.448 19 6 19H26C26.553 19 27 19.447 27 20Z"
      fill="#99AAB5"
    />
    <path
      d="M31 6.27196C30.173 5.73696 29.163 5.69296 28.479 6.24896L27.687 6.89496L26.203 8.10596L26.1031 8.18596L23.727 10.124L11.8491 19.81C11.4121 20.167 11.056 21.029 10.676 21.884C10.298 22.734 9.70705 24.736 9.23305 26.275C9.08505 26.525 8.16805 28.121 8.68205 28.728C9.20205 29.343 11.008 28.738 11.2501 28.652C12.876 28.478 14.9811 28.279 15.898 28.072C16.8221 27.861 17.752 27.677 18.189 27.32C18.1971 27.314 18.199 27.302 18.206 27.297L30.064 17.631L30.8561 16.985L31 16.867V6.27196Z"
      fill="#66757F"
    />
    <path
      d="M18.145 22.526C18.145 22.526 16.871 20.645 16.028 19.973C15.356 19.13 13.479 17.857 13.479 17.857C13.031 17.411 12.288 17.377 11.85 17.814C11.413 18.252 11.057 19.18 10.677 20.105C10.205 21.251 9.40101 24.259 8.90901 25.857C8.82601 26.129 9.42601 25.407 9.41201 25.647C9.40201 25.834 9.43901 26.041 9.48601 26.228L9.34001 26.387L9.54801 26.454C9.57301 26.536 9.59801 26.608 9.61601 26.664L9.77501 26.518C9.96201 26.565 10.169 26.602 10.355 26.592C10.595 26.578 9.87201 27.179 10.145 27.095C11.743 26.602 14.752 25.799 15.897 25.327C16.821 24.946 17.751 24.591 18.188 24.153C18.627 23.718 18.594 22.975 18.145 22.526Z"
      fill="#D99E82"
    />
    <path
      d="M25.312 4.35098C24.436 5.22598 24.436 6.64398 25.312 7.51898L28.479 10.687C29.355 11.561 30.773 11.561 31.647 10.687L34.816 7.51898C35.69 6.64398 35.69 5.22598 34.816 4.35098L31.647 1.18298C30.773 0.307983 29.355 0.307983 28.479 1.18298L25.312 4.35098Z"
      fill="#EA596E"
    />
    <path d="M11.8491 17.815L15.0191 20.985L18.1841 24.151L30.0651 12.272L23.7281 5.93604L11.8491 17.815Z" fill="#FFCC4D" />
    <path
      d="M11.2981 26.742C11.2981 26.742 9.23807 27.875 8.68207 27.318C8.12507 26.76 9.26307 24.707 9.26307 24.707C9.26307 24.707 11.2141 24.743 11.2981 26.742Z"
      fill="#292F33"
    />
    <path d="M23.728 5.93498L27.688 1.97498L34.024 8.31198L30.064 12.272L23.728 5.93498Z" fill="#CCD6DD" />
    <path
      d="M26.103 3.55799L26.895 2.76599L33.231 9.10099L32.439 9.89299L26.103 3.55799ZM24.52 5.14199L25.311 4.35099L31.647 10.686L30.855 11.478L24.52 5.14199Z"
      fill="#99AAB5"
    />
  </svg>
);
