import type * as React from 'react';

export type HTMLAriaDataAttributes = React.AriaAttributes & {
  [key: `data-${string}`]: unknown;
} & Pick<React.HTMLAttributes<HTMLDivElement>, 'role'>;
