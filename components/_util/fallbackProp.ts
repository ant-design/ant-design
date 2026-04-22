/**
 * Search for the first non-undefined value in the arguments and return it.
 *
 * ```js
 * const mergedIcon = fallbackProp(propIcon, contextIcon, defaultIcon);
 * ```
 *
 * Note: it is different from `??` operator which skips null
 */
export default function fallbackProp<T>(...args: T[]): T | undefined {
  return args.find((arg) => arg !== undefined);
}
