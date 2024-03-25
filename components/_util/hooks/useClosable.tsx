import type { ReactNode } from 'react';
import React from 'react';
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
): [closable: boolean, closeIcon: React.ReactNode] {
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
  preset = true,
) {
  if (typeof closable === 'object' && closable.closeIcon) {
    return getCloseIcon(closable.closeIcon, defaultCloseIcon);
  }
  if (closable === false) {
    return null;
  }
  return preset ? getCloseIcon(closeIcon, defaultCloseIcon) : closeIcon;
}

type ClosableConfig = {
  closeIcon: ReactNode;
  ariaProps: React.AriaAttributes;
};

function getClosableConfig(props: UseClosableParams): ClosableConfig | null {
  const {
    closable,
    closeIcon,
    defaultCloseIcon = <CloseOutlined />,
    defaultClosable = false,
    context,
  } = props;
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

  if (!mergedClosable) {
    return null;
  }

  const ariaProps = getAriaProps(closable) ?? getAriaProps(context?.closable) ?? {};
  return {
    closeIcon: mergedCloseIcon,
    ariaProps,
  };
}

function getDisplayCloseIcon(props: UseClosableParams, closableConfig: ClosableConfig) {
  const { customCloseIconRender } = props;
  const { closeIcon, ariaProps } = closableConfig;

  const plainCloseIcon = customCloseIconRender ? customCloseIconRender(closeIcon) : closeIcon;

  const closeIconWithAria = React.isValidElement(plainCloseIcon) ? (
    React.cloneElement(plainCloseIcon, ariaProps)
  ) : (
    <span {...ariaProps}>{plainCloseIcon}</span>
  );
  return closeIconWithAria;
}

function useClosable(
  props: UseClosableParams,
): [closable: boolean, closeIcon: React.ReactNode | null] {
  const closableConfig = getClosableConfig(props);
  if (!closableConfig) {
    return [false, null];
  }
  const mergedCloseIcon = getDisplayCloseIcon(props, closableConfig);

  return [true, mergedCloseIcon];
}

export default useClosable;
