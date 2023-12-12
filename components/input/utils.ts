import type { ReactNode } from 'react';
import type { InputProps } from './Input';

// eslint-disable-next-line import/prefer-default-export
export function hasPrefixSuffix(props: {
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: InputProps['allowClear'];
}) {
  return !!(props.prefix || props.suffix || props.allowClear);
}
