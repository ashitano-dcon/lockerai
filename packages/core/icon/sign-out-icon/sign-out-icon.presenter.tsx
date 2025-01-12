import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type SignOutIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const SignOutIcon = ({ ...props }: SignOutIconProps): ReactNode => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth={2} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.5 17.6504H4.16667C3.72464 17.6504 3.30072 17.4748 2.98816 17.1622C2.67559 16.8497 2.5 16.4258 2.5 15.9837V4.31706C2.5 3.87503 2.67559 3.45111 2.98816 3.13855C3.30072 2.82599 3.72464 2.65039 4.16667 2.65039H7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M13.3333 14.3171L17.4999 10.1504L13.3333 5.98376" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 10.1504H7.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
