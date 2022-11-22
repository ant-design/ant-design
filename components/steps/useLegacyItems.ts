import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import type { StepProps } from '.';
import warning from '../_util/warning';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter((item) => item) as T[];
}

export default function useLegacyItems(items?: StepProps[], children?: React.ReactNode) {
  if (items) {
    return items;
  }

  warning(!children, 'Steps', 'Step is deprecated. Please use `items` directly.');

  const childrenItems = toArray(children).map((node: React.ReactElement<StepProps>) => {
    if (React.isValidElement(node)) {
      const { props } = node;
      const item: StepProps = {
        ...props,
      };
      return item;
    }

    return null;
  });

  return filter(childrenItems);
}
