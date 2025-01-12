'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

type DropdownMenuSeparatorProps = Omit<ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>, 'children' | 'className'>;

export const DropdownMenuSeparator = forwardRef<ElementRef<typeof DropdownMenuPrimitive.Separator>, Omit<DropdownMenuSeparatorProps, 'ref'>>(
  ({ ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className="h-px bg-sage-6" {...props} />,
);

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
