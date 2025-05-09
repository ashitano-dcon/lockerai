import { Image } from '#core/component/image';
import { BrandIcon } from '@lockerai/core/component/brand-icon';
import { Link } from '@lockerai/core/component/link';
import { cn } from '@lockerai/tailwind';
import { useTranslations } from 'next-intl';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { User } from '#website/common/model/user';
import { HeaderLink } from './component/header-link';
import { SignInButton } from './component/sign-in-button';
import { UserDropdownMenu } from './component/user-dropdown-menu';
import { UserQrcodeDialog } from './component/user-qrcode-dialog';

export type InAppHeaderRouteIndicatorDividerProps = ComponentPropsWithoutRef<'svg'>;

export const InAppHeaderRouteIndicatorDivider = ({ className, ...props }: InAppHeaderRouteIndicatorDividerProps): ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    className={cn('mr-1 h-5 w-5 shrink-0 stroke-sage-11 tablet:h-10 tablet:w-10', className)}
    {...props}
  >
    <path d="M28.8263 5.91498L12.5597 34.085" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type InAppHeaderRouteIndicatorIconProps = Omit<ComponentPropsWithoutRef<typeof Image>, 'width' | 'height'>;

export const InAppHeaderRouteIndicatorIcon = ({ alt, className, skeleton, ...props }: InAppHeaderRouteIndicatorIconProps): ReactNode => (
  <Image
    alt={alt}
    width={32}
    height={32}
    className={cn('h-8 w-8 rounded-full bg-sage-3', className)}
    skeleton={{
      className: cn('shrink-0', skeleton?.className),
    }}
    {...props}
  />
);

export type InAppHeaderRouteIndicatorLabelProps = ComponentPropsWithoutRef<'p'>;

export const InAppHeaderRouteIndicatorLabel = ({ children, className, ...props }: InAppHeaderRouteIndicatorLabelProps): ReactNode => (
  <p className={cn('my-auto line-clamp-3 max-h-14 grow text-wrap pl-2 text-sm leading-tight text-sage-11 desktop:text-base', className)} {...props}>
    {children}
  </p>
);

export type InAppHeaderProps = Omit<ComponentPropsWithoutRef<'header'>, 'className'> & {
  user: User | null;
};

export const InAppHeader = ({ user, children, ...props }: InAppHeaderProps): ReactNode => {
  const t = useTranslations('InAppHeader');
  return (
    <header
      className={
        'sticky left-0 top-0 z-20 flex w-full flex-col items-start justify-center overflow-hidden border-b border-green-6/50 bg-gradient-to-b from-green-1 to-[200%] backdrop-blur-lg'
      }
      {...props}
    >
      <div className="flex w-full grow flex-row items-center justify-between gap-2 px-6 py-3 desktop:px-10">
        <div className="flex w-full flex-row items-center gap-0 tablet:gap-1">
          <Link href="/" className="transition hover:opacity-70">
            <span className="sr-only">Locker.ai</span>
            <BrandIcon aria-hidden className={'block h-14 w-12'} />
          </Link>
          {children}
        </div>
        <div className="flex shrink-0 grow-0 items-center gap-6 justify-self-end">
          {user ? (
            <>
              <UserQrcodeDialog user={user} />
              <UserDropdownMenu user={user} />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      <nav className="flex w-full flex-row gap-1 px-6 tablet:w-fit desktop:px-16">
        <HeaderLink href="/dashboard" className="max-w-40 grow tablet:grow-0">
          {t('overview')}
        </HeaderLink>
        <HeaderLink href="/search" className="max-w-40 grow tablet:grow-0">
          {t('search')}
        </HeaderLink>
        <HeaderLink href="/report" className="max-w-40 grow tablet:grow-0">
          {t('report')}
        </HeaderLink>
      </nav>
    </header>
  );
};
