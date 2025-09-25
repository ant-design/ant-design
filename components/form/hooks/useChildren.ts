import { toArray } from '@rc-component/util';

import type { FormItemProps } from '../FormItem';

export default function useChildren(
  children?: FormItemProps['children'],
): FormItemProps['children'] {
  if (typeof children === 'function') {
    return children;
  }

  const childList = toArray(children);
  return childList.length <= 1 ? childList[0] : childList;
}
