'use client';

import { cn } from '@lockerai/tailwind';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

type DropdownMenuItemProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>, 'className'>;

export const DropdownMenuItem = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Item>, Omit<DropdownMenuItemProps, 'ref'>>(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 outline-none transition hover:bg-sage-4',
        'text-base font-bold text-sage-11 hover:text-sage-12',
        'rdx-disabled:pointer-events-none rdx-disabled:opacity-50',
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  ),
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
