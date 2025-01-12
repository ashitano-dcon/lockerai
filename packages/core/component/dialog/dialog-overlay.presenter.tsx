'use client';

import { cn } from '@lockerai/tailwind';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from 'react';

type DialogOverlayProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive.Overlay>, 'children' | 'className'>;

export const DialogOverlay = forwardRef<ElementRef<typeof DialogPrimitive.Overlay>, Omit<DialogOverlayProps, 'ref'>>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 backdrop-blur',
      'rdx-state-closed:animate-out rdx-state-closed:fade-out-0 rdx-state-open:animate-in rdx-state-open:fade-in-0',
    )}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
