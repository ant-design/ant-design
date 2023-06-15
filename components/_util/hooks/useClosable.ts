import type { ReactNode } from 'react';

export default function useClosable(
  closable?: boolean,
  closeIcon?: boolean | ReactNode,
  defaultClosable = false,
): boolean {
  if (typeof closable === 'boolean') {
    return closable;
  }
  if (closeIcon === undefined) {
    return defaultClosable;
  }
  return closeIcon !== false && closeIcon !== null;
}
