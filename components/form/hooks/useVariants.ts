import { useContext } from 'react';

import { VariantContext } from '../context';

export const Variants = ['outlined', 'borderless', 'filled'] as const;
export type Variant = (typeof Variants)[number];

/**
 * Compatible for legacy `bordered` prop.
 */
const useVariant = (
  variant: Variant | undefined,
  legacyBordered: boolean | undefined = undefined,
): [Variant, boolean] => {
  const ctxVariant = useContext(VariantContext);

  let mergedVariant: Variant;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    mergedVariant = ctxVariant ?? 'outlined';
  }

  const enableVariantCls = Variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls];
};

export default useVariant;
