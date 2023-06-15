import { CloseOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import React from 'react';

function useInnerClosable(
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

export type UseClosableParams = {
  closable?: boolean;
  closeIcon?: boolean | ReactNode;
  defaultClosable?: boolean;
  defaultCloseIcon?: ReactNode;
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
};

export default function useClosable({
  closable,
  closeIcon,
  defaultClosable = false,
  defaultCloseIcon = <CloseOutlined />,
  customCloseIconRender,
}: UseClosableParams): [boolean, React.ReactNode | null] {
  const mergedClosable = useInnerClosable(closable, closeIcon, defaultClosable);
  if (!mergedClosable || closeIcon === null || closeIcon === false) {
    return [false, null];
  }
  const mergedCloseIcon =
    closeIcon === undefined || closeIcon === true ? defaultCloseIcon : closeIcon;
  return [true, customCloseIconRender ? customCloseIconRender(mergedCloseIcon) : mergedCloseIcon];
}
