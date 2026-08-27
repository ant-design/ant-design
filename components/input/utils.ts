import type { ReactNode } from 'react';

import { isReactRenderable } from '../_util/is';
import type { InputProps } from './Input';

export function hasPrefixSuffix(props: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: InputProps['allowClear'];
  showCount?: InputProps['showCount'];
}) {
  return (
    isReactRenderable(props.prefix) ||
    isReactRenderable(props.suffix) ||
    !!props.allowClear ||
    !!props.showCount
  );
}
