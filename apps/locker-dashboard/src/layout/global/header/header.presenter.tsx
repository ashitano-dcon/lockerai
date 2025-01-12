import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { Link } from '@lockerai/core/component/link';
import { type VariantProps, cn, tv } from '@lockerai/tailwind';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const headerVariant = tv({
  base: 'left-0 top-0 z-20',
  variants: {
    'hidden-navigation': {
      true: 'fixed',
      false: 'sticky border-b border-green-6/50 bg-gradient-to-b from-green-1 to-[200%] backdrop-blur-lg tablet:px-10',
    },
  },
  defaultVariants: {
    'hidden-navigation': true,
  },
});

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children' | 'className'> & {
  variant?: VariantProps<typeof headerVariant>;
};

export const Header = ({ variant, ...props }: HeaderProps): ReactNode => (
  <header className={cn('flex w-full items-center justify-between p-3 tablet:px-16 tablet:py-4', headerVariant({ ...variant }))} {...props}>
    <Link href="/" className="transition hover:opacity-70">
      <span className="sr-only">Locker.ai</span>
      <BrandLogo aria-hidden className={cn('hidden h-11 w-auto tablet:block tablet:h-14')} />
    </Link>
  </header>
);
