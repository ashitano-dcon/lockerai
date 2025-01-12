/* eslint-disable tailwindcss/no-custom-classname */

'use client';

import { cn } from '@lockerai/tailwind';
import type { ComponentProps, ComponentPropsWithRef } from 'react';
import { Toaster } from 'sonner';
import { match } from 'ts-pattern';
import { useTheme } from '#core/component/theme-provider';

type SonnerProps = Omit<ComponentPropsWithRef<typeof Toaster>, 'children' | 'className' | 'theme'>;

export const Sonner = ({ ...props }: SonnerProps) => {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={match<string | undefined, ComponentProps<typeof Toaster>['theme']>(theme)
        .with('light', () => 'light')
        .with('dark', () => 'dark')
        .with('system', () => 'system')
        .otherwise(() => undefined)}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'toast group flex w-full gap-4 rounded-xl p-4',
            'group-[.toaster]:border group-[.toaster]:shadow-lg',
            '[&_svg]:mt-8 [&_svg]:h-6 [&_svg]:w-6',
          ),
          title: cn('group-[.toast]:text-base group-[.toast]:font-bold'),
          description: cn('description group-[.toast]:text-sm'),
          actionButton: cn('group-[.toast]:border group-[.toast]:border-green-7 group-[.toast]:bg-green-3 group-[.toast]:text-green-12'),
          cancelButton: cn('group-[.toast]:bg-sage-3 group-[.toast]:text-sage-12'),
          info: cn('group-[.toaster]:border-sage-7 group-[.toaster]:bg-sage-3 group-[.toaster]:text-sage-12 [&_.description]:text-sage-11'),
          error: cn('group-[.toaster]:border-red-7 group-[.toaster]:bg-red-3 group-[.toaster]:text-red-12 [&_.description]:text-red-11'),
          warning: cn('group-[.toaster]:border-amber-7 group-[.toaster]:bg-amber-3 group-[.toaster]:text-amber-12 [&_.description]:text-amber-11'),
          success: cn('group-[.toaster]:border-green-7 group-[.toaster]:bg-green-3 group-[.toaster]:text-green-12 [&_.description]:text-green-11'),
        },
      }}
      className="toaster group"
      {...props}
    />
  );
};

Sonner.displayName = 'Sonner';
