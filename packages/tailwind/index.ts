import clsx, { type ClassValue } from 'clsx';
import { type Config as TailwindMergeConfig, extendTailwindMerge } from 'tailwind-merge';
import {
  type ClassValue as TVClassValue,
  type TVCompoundSlots,
  type TVCompoundVariants,
  type TVDefaultVariants,
  type TVReturnType,
  type TVScreens,
  type TVSlots,
  type TVVariants,
  type VariantProps,
  tv as tvBase,
} from 'tailwind-variants';
import type { TVConfig } from 'tailwind-variants/dist/config.js';

const tailwindMergeConfig: Partial<TailwindMergeConfig<string, string>> = {};

const twMerge = extendTailwindMerge(tailwindMergeConfig);

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const tvConfig = {
  // HACK: The tv API currently does not allow to specify the presence or absence of responsiveVariants for each variant, it is redundant to enable responsiveVariants as a whole.
  // ref: https://github.com/nextui-org/tailwind-variants/issues/35#issuecomment-1515941234
  responsiveVariants: true,
  twMerge: true,
  // HACK: tailwind-variants depends on an older version of tailwind-merge, so the type needs to be asserted.
  twMergeConfig: tailwindMergeConfig as TVConfig['twMergeConfig'],
} satisfies TVConfig;

// NOTE: Redefine tv API independently to override tv API settings.
// ref: node_modules/tailwind-variants/dist/index.d.ts
export const tv = <
  V extends TVVariants<S, B, EV>,
  CV extends TVCompoundVariants<V, S, B, EV, ES>,
  DV extends TVDefaultVariants<V, S, EV, ES>,
  // NOTE: Override Generics C with own tvConfig definition.
  // C extends TVConfig<V, EV>,
  B extends TVClassValue = undefined,
  S extends TVSlots = undefined,
  // @ts-expect-error: TS doesn't support recursive type yet.
  E extends TVReturnType = TVReturnType<
    V,
    S,
    B,
    typeof tvConfig,
    // @ts-expect-error: TS doesn't support recursive type yet.
    // eslint-disable-next-line @typescript-eslint/ban-types
    EV extends undefined ? {} : EV,
    // @ts-expect-error: TS doesn't support recursive type yet.
    // eslint-disable-next-line @typescript-eslint/ban-types
    ES extends undefined ? {} : ES
  >,
  EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'],
  ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined,
>(options: {
  /**
   * Extend allows easily compose components.
   * @see https://www.tailwind-variants.org/docs/composing-components
   */
  extend?: E;
  /**
   * Base allows you to set a base class for a component.
   */
  base?: B;
  /**
   * Slots allows you to separate an component into multiple parts.
   * @see https://www.tailwind-variants.org/docs/slots
   */
  slots?: S;
  /**
   * Variants allows you to create multiple versions of the same component.
   * @see https://www.tailwind-variants.org/docs/variants#adding-variants
   */
  variants?: V;
  /**
   * Compound variants allow apply classes to multiple variants at once.
   * @see https://www.tailwind-variants.org/docs/variants#compound-variants
   */
  compoundVariants?: CV;
  /**
   * Compound slots allow apply classes to multiple slots at once.
   */
  compoundSlots?: TVCompoundSlots<V, S, B>;
  /**
   * Default variants allow you to set default variants for a component.
   * @see https://www.tailwind-variants.org/docs/variants#default-variants
   */
  defaultVariants?: DV;
}): TVReturnType<V, S, B, typeof tvConfig, EV, ES> => tvBase(options, tvConfig);

export type { VariantProps, TVScreens };
