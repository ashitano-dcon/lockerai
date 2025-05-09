import { BrandIcon } from '@lockerai/core/component/brand-icon';
import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { type VariantProps, cn, tv } from '@lockerai/tailwind';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { User } from '#website/common/model/user';
import { Link } from '#website/i18n/navigation';
import { SignInButton } from './component/sign-in-button';
import { UserDropdownMenu } from './component/user-dropdown-menu';

const headerVariant = tv({
  base: 'left-0 top-0 z-20',
  variants: {
    'hidden-navigation': {
      true: 'fixed',
      false: 'sticky border-b border-green-6/50 bg-gradient-to-b from-green-1 to-[200%] backdrop-blur-lg tablet:px-10',
    },
  },
  defaultVariants: {
    'hidden-navigation': false,
  },
});

export type HeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'children' | 'className'> & {
  user: User | null;
  variant?: VariantProps<typeof headerVariant>;
};

export const Header = ({ user, variant, ...props }: HeaderProps): ReactNode => (
  <header className={cn('flex w-full items-center justify-between p-3 tablet:px-16 tablet:py-4', headerVariant({ ...variant }))} {...props}>
    <Link href="/" className="transition hover:opacity-70">
      <span className="sr-only">Locker.ai</span>
      <BrandLogo aria-hidden className={cn('hidden h-11 w-auto tablet:block tablet:h-14', !variant?.['hidden-navigation'] && 'tablet:hidden')} />
      <BrandIcon aria-hidden className={cn('block h-11 w-auto tablet:hidden', !variant?.['hidden-navigation'] && 'tablet:block')} />
    </Link>
    <div className="flex items-center gap-6">{user ? <UserDropdownMenu user={user} /> : <SignInButton />}</div>
  </header>
);
