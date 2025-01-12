'use client';

import { useTheme } from '@lockerai/core/component/theme-provider';
import { ComputerIcon } from '@lockerai/core/icon/computer-icon';
import { MoonIcon } from '@lockerai/core/icon/moon-icon';
import { SunIcon } from '@lockerai/core/icon/sun-icon';
import { cn } from '@lockerai/tailwind';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';

type ThemeSwitchProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className' | 'onValueChange' | 'value'>;

export const ThemeSwitch = ({ ...props }: ThemeSwitchProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      role="radiogroup"
      aria-label="theme switch"
      className="flex w-fit items-center gap-1 rounded-full border border-sage-7 px-2 py-1 tablet:gap-2 tablet:px-3 tablet:py-2"
      {...props}
    >
      <button
        role="radio"
        type="button"
        aria-label="light theme button"
        aria-checked={mounted && theme === 'light'}
        onClick={() => setTheme('light')}
        className={cn('group rounded-full p-2 transition', mounted && theme === 'light' && 'bg-sage-5')}
      >
        <SunIcon aria-hidden className="h-4 w-4 fill-sage-11 stroke-sage-11 transition group-hover:fill-sage-12 group-hover:stroke-sage-12" />
        <span className="sr-only">Switch to light theme</span>
      </button>
      <button
        role="radio"
        type="button"
        aria-label="dark theme button"
        aria-checked={mounted && theme === 'dark'}
        onClick={() => setTheme('dark')}
        className={cn('group rounded-full p-2 transition', mounted && theme === 'dark' && 'bg-sage-5')}
      >
        <MoonIcon aria-hidden className="h-4 w-4 fill-sage-11 stroke-sage-11 transition group-hover:fill-sage-12 group-hover:stroke-sage-12" />
        <span className="sr-only">Switch to dark theme</span>
      </button>
      <button
        role="radio"
        type="button"
        aria-label="system theme button"
        aria-checked={mounted && theme === 'system'}
        onClick={() => setTheme('system')}
        className={cn('group rounded-full p-2 transition', mounted && theme === 'system' && 'bg-sage-5')}
      >
        <ComputerIcon aria-hidden className="h-4 w-4 fill-sage-11 stroke-sage-11 transition group-hover:fill-sage-12 group-hover:stroke-sage-12" />
        <span className="sr-only">Switch to system theme</span>
      </button>
    </div>
  );
};
