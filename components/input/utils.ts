import type { ReactNode } from 'react';

import { isPlainObject } from '../_util/is';
import type { InputProps } from './Input';

export function hasPrefixSuffix(props: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: InputProps['allowClear'];
  showCount?: InputProps['showCount'];
}) {
  const { allowClear } = props;
  const clearEnabled = isPlainObject(allowClear) ? !allowClear.disabled : allowClear;
  return !!(props.prefix || props.suffix || clearEnabled || props.showCount);
}
