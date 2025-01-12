'use client';

import { cn } from '@lockerai/tailwind';
import * as RadixUiSwitch from '@radix-ui/react-switch';
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react';

type SelectContentProps = Omit<ComponentPropsWithoutRef<typeof RadixUiSwitch.Root>, 'className'>;

export const Switch = forwardRef<ElementRef<typeof RadixUiSwitch.Root>, Omit<SelectContentProps, 'ref'>>(({ ...props }, ref) => (
  <RadixUiSwitch.Root
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-4 border-transparent shadow-inner transition disabled:cursor-not-allowed disabled:opacity-50 rdx-state-checked:bg-green-11 rdx-state-unchecked:bg-sage-11',
    )}
    {...props}
    ref={ref}
  >
    <RadixUiSwitch.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-sage-3 shadow-lg ring-0 transition rdx-state-checked:translate-x-5 rdx-state-unchecked:translate-x-0',
      )}
    />
  </RadixUiSwitch.Root>
));

Switch.displayName = RadixUiSwitch.Root.displayName;
