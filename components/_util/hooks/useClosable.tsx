import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from 'rc-util/lib/pickAttrs';
import { AlertConfig, DrawerConfig, ModalConfig, TagConfig } from 'antd/es/config-provider/context';

export type UseClosableParams = {
  closable?: boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);
  closeIcon?: ReactNode;
  defaultClosable?: boolean;
  defaultCloseIcon?: ReactNode;
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
  context?: TagConfig | DrawerConfig | ModalConfig | AlertConfig;
};

function useInnerClosable(
  closable?: UseClosableParams['closable'],
  closeIcon?: ReactNode,
  defaultClosable?: boolean,
) {
  if (typeof closable === 'boolean') {
    return closable;
  }
  if (typeof closable === 'object') {
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
  context,
}: UseClosableParams): [closable: boolean, closeIcon: React.ReactNode | null] {
  const mergedContextCloseIcon = React.useMemo(() => {
    if (typeof context?.closable === 'object' && context.closable.closeIcon) {
      return context.closable.closeIcon;
    }
    return context?.closeIcon;
  }, [context?.closable, context?.closeIcon]);

  const curCloseIcon = closeIcon ?? mergedContextCloseIcon;
  const mergedClosable = useInnerClosable(closable, curCloseIcon, defaultClosable);

  if (!mergedClosable) {
    return [false, null];
  }
  const { closeIcon: closableIcon, ...restProps } =
    typeof closable === 'object'
      ? closable
      : ({} as { closeIcon: React.ReactNode } & React.AriaAttributes);
  // Priority: closable.closeIcon > closeIcon > defaultCloseIcon
  const mergedCloseIcon: ReactNode = (() => {
    if (typeof closable === 'object' && closableIcon !== undefined) {
      return closableIcon;
    }
    return typeof curCloseIcon === 'boolean' || curCloseIcon === undefined || curCloseIcon === null
      ? defaultCloseIcon
      : curCloseIcon;
  })();
  const ariaProps = pickAttrs(restProps, true);

  const plainCloseIcon = customCloseIconRender
    ? customCloseIconRender(mergedCloseIcon)
    : mergedCloseIcon;

  const closeIconWithAria = React.isValidElement(plainCloseIcon) ? (
    React.cloneElement(plainCloseIcon, ariaProps)
  ) : (
    <span {...ariaProps}>{plainCloseIcon}</span>
  );

  return [true, closeIconWithAria];
}

export default useClosable;
