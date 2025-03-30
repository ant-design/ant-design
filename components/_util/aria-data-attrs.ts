import type * as React from 'react';

export type HTMLAriaDataAttributes = React.AriaAttributes & {
  [key: `data-${string}`]: unknown;
} & Pick<React.HTMLAttributes<HTMLDivElement>, 'role'>;

export function getAriaDataAttrs(props: Record<string, any> = {}): HTMLAriaDataAttributes {
  const ariaDataAttrs: HTMLAriaDataAttributes = {} as HTMLAriaDataAttributes;
  for (const key in props) {
    if (key.startsWith('data-') || key.startsWith('aria-') || key === 'role') {
      ariaDataAttrs[key as keyof HTMLAriaDataAttributes] = props[key];
    }
  }

  return ariaDataAttrs;
}
