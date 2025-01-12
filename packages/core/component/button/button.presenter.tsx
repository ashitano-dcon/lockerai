import { type TVScreens, type VariantProps, cn, tv } from '@lockerai/tailwind';
import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react';

const buttonVariant = tv({
  variants: {
    border: {
      true: 'border-2',
    },
    color: {
      purple: 'border-purple-7 bg-purple-3 text-purple-11 hover:bg-purple-4 disabled:bg-purple-3',
      cyan: 'border-cyan-7 bg-cyan-3 text-cyan-11 hover:bg-cyan-4 disabled:bg-cyan-3',
      green: 'border-green-7 bg-green-3 text-green-11 hover:bg-green-4 disabled:bg-green-3',
      sage: 'border-sage-7 bg-sage-3 text-sage-11 hover:bg-sage-4 disabled:bg-sage-3',
    },
    loading: {
      true: null,
    },
    width: {
      auto: 'w-auto',
      fit: 'w-fit',
      full: 'w-full',
    },
    'as-icon': {
      true: 'rounded-full p-2',
    },
  },
  defaultVariants: {
    width: 'auto',
  },
  slots: {
    base: null,
    content: null,
    spinner: null,
  },
  compoundSlots: [
    {
      slots: [`base`],
      loading: true,
      className: 'cursor-not-allowed',
    },
    {
      slots: [`content`],
      loading: true,
      className: 'opacity-0',
    },
    {
      slots: [`spinner`],
      color: 'purple',
      loading: true,
      className: 'border-purple-11',
    },
    {
      slots: [`spinner`],
      color: 'cyan',
      loading: true,
      className: 'border-cyan-11',
    },
    {
      slots: [`spinner`],
      color: 'green',
      loading: true,
      className: 'border-green-11',
    },
    {
      slots: [`spinner`],
      color: 'sage',
      loading: true,
      className: 'border-sage-11',
    },
  ],
});

type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'className'> & {
  icon?: (props: Omit<ComponentPropsWithoutRef<'svg'>, 'children'>) => ReactNode;
  variant?: Omit<VariantProps<typeof buttonVariant>, 'loading'> &
    Partial<
      Record<
        keyof Pick<VariantProps<typeof buttonVariant>, 'loading'>,
        Exclude<VariantProps<typeof buttonVariant>['loading'], Partial<Record<TVScreens, boolean>>>
      >
    >;
};

export const Button = forwardRef<ElementRef<'button'>, Omit<ButtonProps, 'ref'>>(({ icon: Icon, variant, children, ...props }, ref): ReactNode => {
  const { base, content, spinner } = buttonVariant();

  return (
    <button
      ref={ref}
      aria-busy={variant?.loading}
      aria-live={variant?.loading ? 'polite' : undefined}
      disabled={variant?.loading}
      className={cn('relative rounded-xl px-5 py-2 transition disabled:cursor-not-allowed', base({ ...variant }))}
      {...props}
    >
      <span
        className={cn(
          'flex items-center justify-center gap-2 text-center text-sm font-bold tablet:text-base',
          content({ loading: variant?.loading }),
        )}
      >
        {Icon && <Icon className="h-4 w-4 tablet:h-5 tablet:w-5" />}
        {children}
      </span>
      {variant?.loading && (
        <span className={cn('absolute inset-0 flex h-full w-full animate-spin items-center justify-center', spinner({ loading: variant.loading }))}>
          <span className="aspect-square h-3/5 rounded-full border-[3px] border-t-transparent" />
        </span>
      )}
    </button>
  );
});

Button.displayName = Button.name;
