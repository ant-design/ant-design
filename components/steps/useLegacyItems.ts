import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

import type { StepProps } from '.';
import { devUseWarning } from '../_util/warning';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter((item) => item) as T[];
}

function useLegacyItems(items?: StepProps[], children?: React.ReactNode) {
  if (process.env.NODE_ENV === 'test') {
    const warning = devUseWarning('Menu');
    warning.deprecated(!children, 'Step', 'items');
  }

  if (items) {
    return items;
  }

  const childrenItems = toArray(children).map((node) => {
    if (React.isValidElement<StepProps>(node)) {
      const { props } = node;
      const item: StepProps = { ...props };
      return item;
    }
    return null;
  });

  return filter(childrenItems);
}

export default useLegacyItems;
