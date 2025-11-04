import { devUseWarning } from './warning';

/**
 * Generic hook for displaying deprecation warnings on components.
 * Warns about deprecated props that have been replaced with new alternatives.
 *
 * @param componentName - Name of the component for the warning message
 * @param props - Component props object to check
 * @param deprecatedProps - Map of old prop names to new prop names
 *
 * @example
 * ```tsx
 * useDeprecatedWarnings('Select', props, {
 *   dropdownClassName: 'classNames.popup.root',
 *   bordered: 'variant'
 * });
 * ```
 */
const useDeprecatedWarnings = (
  componentName: string,
  props: Record<string, any>,
  deprecatedProps: Record<string, string>,
): void => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning(componentName);

    Object.entries(deprecatedProps).forEach(([oldProp, newProp]) => {
      warning.deprecated(!(oldProp in props), oldProp, newProp);
    });
  }
};

export default useDeprecatedWarnings;
