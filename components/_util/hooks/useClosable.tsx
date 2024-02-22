import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

export type UseClosableParams = {
  closable?: boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);
  closeIcon?: ReactNode;
  defaultClosable?: boolean;
  defaultCloseIcon?: ReactNode;
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
};

function useInnerClosable(
  closable?: UseClosableParams['closable'],
  closeIcon?: ReactNode,
  defaultClosable?: boolean,
) {
  if (typeof closable === 'boolean') {
    return closable;
  }
  if (!!closable) {
    return true;
  }
  if (closeIcon === undefined) {
    return !!defaultClosable;
  }
  return closeIcon !== false && closeIcon !== null;
}

function useClosable({
  closable,
  closeIcon,
  customCloseIconRender,
  defaultCloseIcon = <CloseOutlined />,
  defaultClosable = false,
}: UseClosableParams): [closable: boolean, closeIcon: React.ReactNode | null] {
  const mergedClosable = useInnerClosable(closable, closeIcon, defaultClosable);
  if (!mergedClosable) {
    return [false, null];
  }
  // Priority: closable.closeIcon > closeIcon > defaultCloseIcon
  const mergedCloseIcon = (() => {
    if (typeof closable === 'object' && closable.closeIcon !== undefined) {
      return closable.closeIcon;
    }
    return typeof closeIcon === 'boolean' || closeIcon === undefined || closeIcon === null
      ? defaultCloseIcon
      : closeIcon;
  })();

  const plainCloseIcon = customCloseIconRender
    ? customCloseIconRender(mergedCloseIcon)
    : mergedCloseIcon;
  const { closeIcon: _, ...ariaProps } = typeof closable === 'object' ? closable : ({} as any);
  const closeIconWithAria = React.isValidElement(plainCloseIcon)
    ? React.cloneElement(plainCloseIcon, ariaProps)
    : plainCloseIcon;
  return [true, closeIconWithAria];
}

export default useClosable;
