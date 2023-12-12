type DefaultVariant = 'outlined' | 'borderless';

/**
 * Compatible for legacy `bordered` prop, safe to remove after `bordered` is removed.
 * @param variant
 * @param legacyBordered
 * @param variants
 */
const useVariant = <T extends string>(
  variant: T | undefined,
  legacyBordered: boolean | undefined,
  variants: readonly (T | DefaultVariant)[],
): [T | DefaultVariant, boolean] => {
  let mergedVariant: T | DefaultVariant;
  if (typeof variant !== 'undefined') {
    mergedVariant = variant;
  } else if (legacyBordered === false) {
    mergedVariant = 'borderless';
  } else {
    mergedVariant = 'outlined';
  }

  const enableVariantCls = variants.includes(mergedVariant);
  return [mergedVariant, enableVariantCls];
};

export default useVariant;
