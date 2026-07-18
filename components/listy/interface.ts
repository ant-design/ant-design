import type * as React from 'react';
import type {
  ListyClassNames,
  ListyRef,
  ListyScrollToConfig,
  ListyStyles,
  ListyProps as RcListyProps,
  ScrollAlign,
} from '@rc-component/listy';

import type { AnyObject } from '../_util/type';

export type { ListyClassNames, ListyRef, ListyScrollToConfig, ListyStyles, ScrollAlign };

export interface ListyProps<T extends AnyObject = AnyObject, K extends React.Key = React.Key>
  extends Omit<RcListyProps<T, K>, 'itemHeight' | 'direction'> {
  className?: string;
  style?: React.CSSProperties;
}
