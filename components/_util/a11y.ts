import type { HTMLAriaDataAttributes } from './aria-data-attrs';

export const pickA11yProps = (props: Record<string, any>): Partial<HTMLAriaDataAttributes> => {
  const a11yProps: Partial<HTMLAriaDataAttributes> = {};

  // Common a11y related attribute prefixes or complete attribute names
  const a11yKeys = new Set(['role', 'tabIndex', 'alt', 'title']);

  Object.keys(props).forEach((key) => {
    if (key.startsWith('aria-') || a11yKeys.has(key)) {
      a11yProps[key as keyof HTMLAriaDataAttributes] = props[key];
    }
  });

  return a11yProps;
};
