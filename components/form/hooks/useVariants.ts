import { useContext } from 'react';

import { VariantContext } from '../context';
import type { Variant } from '../../config-provider';
import { ConfigContext, Variants } from '../../config-provider';

/**
 * Compatible for legacy `bordered` prop.
 */
const useVariant = (
  variant: Variant | undefined,
  legacyBordered: boolean | undefined = undefined,
): [Variant, boolean] => {
  const { variant: configVariant } = useContext(ConfigContext);
  const ctxVariant = useContext(VariantContext);

  let mergedVariant: Variant;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    mergedVariant = ctxVariant ?? configVariant ?? 'outlined';
  }

  const enableVariantCls = Variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls];
};

export default useVariant;
