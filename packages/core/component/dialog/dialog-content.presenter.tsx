'use client';

import { type VariantProps, cn, tv } from '@lockerai/tailwind';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from 'react';
import { CrossIcon } from '#core/icon/cross-icon';
import { DialogOverlay } from './dialog-overlay.presenter';
import { DialogPortal } from './dialog-portal.presenter';

const dialogVariant = tv({
  variants: {
    color: {
      green: 'border-green-7 bg-green-2',
      sage: 'border-sage-7 bg-sage-2',
    },
  },
  defaultVariants: {
    color: 'sage',
  },
});

type DialogContentProps = Omit<ComponentPropsWithRef<typeof DialogPrimitive.Overlay>, 'className'> & {
  variant?: VariantProps<typeof dialogVariant>;
};

export const DialogContent = forwardRef<ElementRef<typeof DialogPrimitive.Content>, Omit<DialogContentProps, 'ref'>>(
  ({ variant, children, ...props }, ref) => (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-sage-7 bg-sage-2 drop-shadow-2xl tablet:w-auto',
          'duration-200 rdx-state-closed:animate-out rdx-state-closed:fade-out-0 rdx-state-closed:zoom-out-95 rdx-state-closed:slide-out-to-left-1/2 rdx-state-closed:slide-out-to-top-[48%] rdx-state-open:animate-in rdx-state-open:fade-in-0 rdx-state-open:zoom-in-95 rdx-state-open:slide-in-from-left-1/2 rdx-state-open:slide-in-from-top-[48%]',
          dialogVariant({ ...variant }),
        )}
        {...props}
      >
        <div className="w-full overflow-y-auto">
          <div className="flex w-full flex-col items-center justify-center gap-6 p-10">{children}</div>
        </div>
        <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-sage-4">
          <CrossIcon className="h-6 w-6 fill-sage-12" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = DialogPrimitive.Content.displayName;
