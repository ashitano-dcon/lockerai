import { BrandLogo } from '@lockerai/core/component/brand-logo';
import { Link } from '@lockerai/core/component/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ThemeSwitch } from './component/theme-switch';

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
          <p className="text-sage-11">Automated lost-and-found service powered by LLM and smart lockers.</p>
        </div>
        <ThemeSwitch />
      </div>
    </div>
    <small className="text-sm text-sage-11">Copyright &copy; Locker.ai all right reserved.</small>
  </footer>
);
