import type { AnyObject } from '../_util/type';

export const replaceParams = <T extends AnyObject = AnyObject>(text: string, params: T) => {
  // Collect parameter names and try longer names first to avoid prefix matches such as `:id` in `:id2`.
  const keys = Object.keys(params).sort((a, b) => b.length - a.length);

  // Avoid creating a regular expression when there are no parameters to replace.
  if (!keys.length) {
    return text;
  }

  // Escape parameter names before embedding them in the dynamically generated regular expression.
  const escapedKeys = keys.map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // Match every occurrence of a known `:param` token so repeated parameters are all replaced.
  const paramsRegExp = new RegExp(`:(${escapedKeys.join('|')})`, 'g');
  // Treat letters, numbers, and underscores as part of a parameter name to prevent partial matches.
  const paramNameCharRegExp = /[\p{L}\p{N}_]/u;

  // Replace valid tokens while preserving unknown or incomplete tokens exactly as written.
  return text.replace(paramsRegExp, (match, key, offset, source) => {
    // Inspect the character after the match to distinguish a complete token from a parameter-name prefix.
    const nextChar = source[offset + match.length];

    if (nextChar && paramNameCharRegExp.test(nextChar)) {
      return match;
    }

    // Keep placeholders whose values are intentionally missing instead of rendering `null` or `undefined`.
    const value = params[key];
    return value == null ? match : String(value);
  });
};
