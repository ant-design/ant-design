import toArray from 'rc-util/lib/Children/toArray';
import type { FormItemProps } from '../FormItem';

export default function useChildren(
  children?: FormItemProps['children'],
): FormItemProps['children'] {
  if (typeof children === 'function') {
    return children;
  }
  const childList = filterChildrenEmptyString(toArray(children));
  return childList!.length <= 1 ? childList![0] : childList;
}

function filterChildrenEmptyString(childrenArray?: Array<any>) {
  return childrenArray?.filter((item) => {
    if (typeof item !== 'string') return true;
    return item && item.trim();
  });
}
