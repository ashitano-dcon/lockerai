import { type VariantProps, cn, tv } from '@lockerai/tailwind';
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react';

const tagVariant = tv({
  variants: {
    color: {
      purple: 'border-purple-7 bg-purple-3 text-purple-11',
      cyan: 'border-cyan-7 bg-cyan-3 text-cyan-11',
      green: 'border-green-7 bg-green-3 text-green-11',
      sage: 'border-sage-7 bg-sage-3 text-sage-11',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
    },
  },
  defaultVariants: {
    width: 'auto',
  },
});

type TagProps = Omit<ComponentPropsWithoutRef<'div'>, 'className'> & { variant?: VariantProps<typeof tagVariant> };

export const Tag = forwardRef<ElementRef<'div'>, Omit<TagProps, 'ref'>>(
  ({ variant, children, ...props }, ref): ReactNode => (
    <div ref={ref} className={cn('relative rounded-full border px-3 py-1', tagVariant({ ...variant }))} {...props}>
      <span className={cn('flex items-center gap-2 text-center text-xs tablet:text-sm')}>{children}</span>
    </div>
  ),
);

Tag.displayName = Tag.name;
