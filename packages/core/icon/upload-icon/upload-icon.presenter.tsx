import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type UploadIconProps = Omit<ComponentPropsWithoutRef<'svg'>, 'children'>;

export const UploadIcon = ({ ...props }: UploadIconProps): ReactNode => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" strokeWidth={2} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17.5 12.8252V16.1585C17.5 16.6006 17.3244 17.0245 17.0118 17.337C16.6993 17.6496 16.2754 17.8252 15.8333 17.8252H4.16667C3.72464 17.8252 3.30072 17.6496 2.98816 17.337C2.67559 17.0245 2.5 16.6006 2.5 16.1585V12.8252"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14.1666 6.99186L9.99992 2.8252L5.83325 6.99186" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 2.8252V12.8252" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
