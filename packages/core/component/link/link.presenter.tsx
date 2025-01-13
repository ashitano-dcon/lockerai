import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react';

export type LinkProps =
  | (ComponentPropsWithoutRef<typeof NextLink> &
      NextLinkProps & {
        external?: false;
      })
  | (ComponentPropsWithoutRef<'a'> & {
      external: true;
    });

const ExoticLink = forwardRef<ElementRef<JSX.IntrinsicElements['a'] & typeof NextLink>, LinkProps>(({ children, ...props }, ref): ReactNode => {
  if ('external' in props) {
    const { external, href, ...anchorProps } = props;

    return (
      <a ref={ref} href={href?.toString()} target="_blank" rel="noopener noreferrer" {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <NextLink ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

ExoticLink.displayName = ExoticLink.name;

export const Link = ExoticLink;
