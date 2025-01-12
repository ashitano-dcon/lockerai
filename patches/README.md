# Patches

A set of patch files to patch dependent packages with pnpm.

## tailwind-variants

In the current tailwind-variants, `TVScreens` and `TVSlots` are not exported. Therefore, a patch is needed to export them.

## urql

Currently, even if `pause` is set to `true` in the argument of `useQuery`, the query is always executed once when the component is mounted. To fix this, a patch has been applied to prevent the query from being executed when the component is mounted if `pause` is set to `true` in the argument of `useQuery`.
