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

export type ClosableType = boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);

export type UseClosableParams = {
  closable?: ClosableType;
  closeIcon?: ReactNode;
  defaultClosable?: boolean;
  defaultCloseIcon?: ReactNode;
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
  context?: TagConfig | DrawerConfig | ModalConfig | AlertConfig;
};

function getMergedCloseIcon(closeIcon: ReactNode, defaultCloseIcon: ReactNode) {
  return typeof closeIcon === 'boolean' || closeIcon === undefined || closeIcon === null
    ? defaultCloseIcon
    : closeIcon;
}

function useInnerClosable(
  closable?: UseClosableParams['closable'],
  closeIcon?: ReactNode,
  defaultClosable?: boolean,
  defaultCloseIcon?: ReactNode,
) {
  if (typeof closable === 'boolean') {
    return [closable, closable ? getMergedCloseIcon(closeIcon, defaultCloseIcon) : null];
  }
  if (typeof closable === 'object') {
    return [true, getMergedCloseIcon(closeIcon, defaultCloseIcon)];
  }
  if (closeIcon === undefined) {
    return [!!defaultClosable, defaultClosable ? defaultCloseIcon : null];
  }
  const curClosable = closeIcon !== false && closeIcon !== null;
  return [curClosable, curClosable ? getMergedCloseIcon(closeIcon, defaultCloseIcon) : null];
}

function getAriaProps(closable: UseClosableParams['closable']) {
  if (typeof closable === 'object' && closable !== null) {
    return pickAttrs(closable, true);
  }
  return null;
}

function getCloseIcon(closeIcon: ReactNode, defaultCloseIcon: ReactNode) {
  if (closeIcon === false) {
    return null;
  }
  if (closeIcon === true) {
    return defaultCloseIcon;
  }
  return closeIcon;
}

function getCloseIconByClosable(
  closable: ClosableType | undefined,
  closeIcon: ReactNode,
  defaultCloseIcon: ReactNode,
  preset: boolean,
) {
  if (typeof closable === 'object' && closable.closeIcon) {
    return getCloseIcon(closable.closeIcon, defaultCloseIcon);
  }
  if (closable === false) {
    return null;
  }
  return preset ? getCloseIcon(closeIcon, defaultCloseIcon) : closeIcon;
}

function useClosable({
  closable,
  closeIcon,
  customCloseIconRender,
  defaultCloseIcon = <CloseOutlined />,
  defaultClosable = false,
  context,
}: UseClosableParams): [closable: boolean, closeIcon: React.ReactNode | null] {
  const contextCloseIcon = getCloseIconByClosable(
    context?.closable,
    context?.closeIcon,
    defaultCloseIcon,
    true,
  );
  const propCloseIcon = getCloseIconByClosable(closable, closeIcon, defaultCloseIcon, false);

  const curCloseIcon = typeof propCloseIcon !== 'undefined' ? propCloseIcon : contextCloseIcon;

  const [mergedClosable, mergedCloseIcon] = useInnerClosable(
    closable,
    curCloseIcon,
    defaultClosable,
    defaultCloseIcon,
  );

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
