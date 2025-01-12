'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

type DropdownMenuGroupProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>, 'className'>;

export const DropdownMenuGroup = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Group>, Omit<DropdownMenuGroupProps, 'ref'>>(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Group ref={ref} className="flex flex-col gap-1" {...props}>
      {children}
    </DropdownMenuPrimitive.Group>
  ),
);

DropdownMenuGroup.displayName = DropdownMenuPrimitive.Group.displayName;
