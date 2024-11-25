import type { ReactNode } from 'react';

import type { InputProps } from './Input';

export function hasPrefixSuffix(props: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: InputProps['allowClear'];
  showCount?: InputProps['showCount'];
}) {
  return !!(props.prefix || props.suffix || props.allowClear || props.showCount);
}
