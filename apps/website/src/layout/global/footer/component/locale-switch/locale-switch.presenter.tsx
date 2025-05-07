'use client';

import { cn } from '@lockerai/tailwind';
import { useLocale } from 'next-intl';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Link, usePathname } from '#website/i18n/navigation';
import { routing } from '#website/i18n/routing';

type LocaleSwitchProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>;

export const LocaleSwitch = (props: LocaleSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  return (
    <div
      role="radiogroup"
      aria-label="Locale switch"
      className="flex w-fit items-center gap-1 rounded-full border border-sage-7 px-2 py-1 tablet:gap-2 tablet:px-3 tablet:py-2"
      {...props}
    >
      {routing.locales.map((l: string) => {
        const checked = mounted && l === locale;
        return (
          <Link key={l} href={pathname} locale={l}>
            <button role="radio" type="button" aria-checked={checked} className={cn('group rounded-full p-2 transition', checked && 'bg-sage-5')}>
              {l.toUpperCase()}
              <span className="sr-only">{`Switch language to ${l}`}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};
