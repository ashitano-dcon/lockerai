'use client';

import { cn } from '@lockerai/tailwind';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

type DropdownMenuContentProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>, 'className'>;

export const DropdownMenuContent = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Content>, Omit<DropdownMenuContentProps, 'ref'>>(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={10}
        className={cn(
          'z-50 flex min-w-[128px] flex-col gap-2 overflow-hidden rounded-xl border border-sage-7 bg-sage-2 p-4 shadow-2xl',
          'rdx-state-closed:animate-out rdx-state-closed:fade-out-0 rdx-state-closed:zoom-out-95 rdx-state-open:animate-in rdx-state-open:fade-in-0 rdx-state-open:zoom-in-95 rdx-side-bottom:slide-in-from-top-2 rdx-side-left:slide-in-from-right-2 rdx-side-right:slide-in-from-left-2 rdx-side-top:slide-in-from-bottom-2',
        )}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  ),
);

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
