import type { ReactNode } from 'react';
import React, { useMemo } from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from 'rc-util/lib/pickAttrs';

import type {
  AlertConfig,
  DrawerConfig,
  ModalConfig,
  TagConfig,
} from '../../config-provider/context';

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

function getAriaProps(closable: UseClosableParams['closable']) {
  if (typeof closable === 'object' && closable !== null) {
    return pickAttrs(closable, true);
  }
  return null;
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
  const curCloseIcon = typeof closeIcon !== 'undefined' ? closeIcon : mergedContextCloseIcon;
  const mergedClosable = useInnerClosable(closable, curCloseIcon, defaultClosable);

  const { closeIcon: closableIcon } =
    typeof closable === 'object'
      ? closable
      : ({} as { closeIcon: React.ReactNode } & React.AriaAttributes);
  // Priority: closable.closeIcon > closeIcon > defaultCloseIcon
  const mergedCloseIcon: ReactNode = useMemo(() => {
    if (typeof closable === 'object' && closableIcon !== undefined) {
      return closableIcon;
    }
    return typeof curCloseIcon === 'boolean' || curCloseIcon === undefined || curCloseIcon === null
      ? defaultCloseIcon
      : curCloseIcon;
  }, [closable, curCloseIcon, defaultCloseIcon, closableIcon]);

  const ariaProps = useMemo(
    () => getAriaProps(closable) ?? getAriaProps(context?.closable) ?? {},
    [closable, context?.closable],
  );

  if (!mergedClosable) {
    return [false, null];
  }

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
