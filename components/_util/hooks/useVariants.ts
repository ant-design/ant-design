type DefaultVariant = 'outlined' | 'borderless';

/**
 * Compatible for legacy `bordered` prop, safe to remove after `bordered` is removed.
 * @param variant
 * @param legacyBordered
 */
const useVariant = <T extends DefaultVariant>(
  variant: T | undefined,
  legacyBordered: boolean | undefined,
): T | DefaultVariant => {
  if (typeof variant !== 'undefined') {
    return variant;
  }
  if (legacyBordered === false) {
    return 'borderless';
  }
  return 'outlined';
};

export default useVariant;
