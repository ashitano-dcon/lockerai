import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { Link } from '@lockerai/core/component/link';
import { ExternalLinkIcon } from '@lockerai/core/icon/external-link-icon';
import { cn } from '@lockerai/tailwind';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ThemeSwitch } from './component/theme-switch';

type NavigationLinkProps = ComponentPropsWithoutRef<typeof Link>;

const NavigationLink = ({ className, children, ...props }: NavigationLinkProps): ReactNode => (
  <Link className={cn('group flex items-center gap-3 text-lg text-sage-12 transition hover:text-sage-11 tablet:text-xl', className)} {...props}>
    {children}
  </Link>
);

type FooterProps = Omit<ComponentPropsWithoutRef<'footer'>, 'children' | 'className'>;

export const Footer = ({ ...props }: FooterProps): ReactNode => (
  <footer className="flex w-full flex-col items-center gap-6 p-6 tablet:gap-10 tablet:p-10" {...props}>
    <div className="flex w-full flex-col justify-between gap-16 border-b-2 border-sage-6 pb-6 tablet:pb-10 laptop:flex-row">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Link href="/" className="transition hover:opacity-70">
            <span className="sr-only">Locker.ai</span>
            <BrandLogo aria-hidden className="h-11 w-auto tablet:h-14" />
          </Link>
          <p className="text-sage-11">AI-driven lost and found management service.</p>
        </div>
        <ThemeSwitch />
      </div>
      <nav aria-label="footer navigation">
        <ul className="flex flex-wrap gap-12 tablet:gap-16">
          <li className="flex flex-col gap-4">
            <p className="font-bold text-sage-11 tablet:text-lg">Reference</p>
            <ul className="flex flex-col gap-2">
              <li>
                <NavigationLink href="https://github.com/nitic-pbl-p8/lockerai" external>
                  Source code
                  <ExternalLinkIcon className="h-4 w-4 stroke-sage-12 transition group-hover:stroke-sage-11" />
                </NavigationLink>
              </li>
              <li>
                <NavigationLink
                  href="https://www.figma.com/file/xNKAhniAfPPTsL987xRCVe/website?type=design&node-id=20%3A35&mode=design&t=oAlQP6Jqqk0ZcqOy-1"
                  external
                >
                  Design
                  <ExternalLinkIcon className="h-4 w-4 stroke-sage-12 transition group-hover:stroke-sage-11" />
                </NavigationLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <small className="text-sm text-sage-11">Copyright &copy; nitic-pbl-p8 all right reserved.</small>
  </footer>
);
