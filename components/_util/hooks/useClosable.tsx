import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { ReactNode } from 'react';
import React from 'react';

function useInnerClosable(
  closable?: boolean,
  closeIcon?: boolean | ReactNode,
  defaultClosable?: boolean,
): boolean {
  if (typeof closable === 'boolean') {
    return closable;
  }
  if (closeIcon === undefined) {
    return !!defaultClosable;
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

export default function useClosable(
  closable?: boolean,
  closeIcon?: boolean | ReactNode,
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode,
  defaultCloseIcon: ReactNode = <CloseOutlined />,
  defaultClosable = false,
): [closable: boolean, closeIcon: React.ReactNode | null] {
  const mergedClosable = useInnerClosable(closable, closeIcon, defaultClosable);
  if (!mergedClosable) {
    return [false, null];
  }
  const mergedCloseIcon =
    typeof closeIcon === 'boolean' || closeIcon === undefined || closeIcon === null
      ? defaultCloseIcon
      : closeIcon;
  return [true, customCloseIconRender ? customCloseIconRender(mergedCloseIcon) : mergedCloseIcon];
}
