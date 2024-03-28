import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import pickAttrs from 'rc-util/lib/pickAttrs';

export type BaseClosableType = { closeIcon?: React.ReactNode } & React.AriaAttributes;
export type ClosableType = boolean | BaseClosableType;

export type ContextClosable<T extends { closable?: ClosableType; closeIcon?: ReactNode } = any> =
  Partial<Pick<T, 'closable' | 'closeIcon'>>;

export function pickClosable<T extends { closable?: ClosableType; closeIcon?: ReactNode }>(
  context?: ContextClosable<T>,
): ContextClosable<T> | undefined {
  if (!context) {
    return undefined;
  }
  return {
    closable: context.closable,
    closeIcon: context.closeIcon,
  };
}

export type UseClosableParams = {
  closable?: ClosableType;
  closeIcon?: ReactNode;
  defaultClosable?: boolean;
  defaultCloseIcon?: ReactNode;
  customCloseIconRender?: (closeIcon: ReactNode) => ReactNode;
  context?: ContextClosable;
};

function getMergedCloseIcon(closeIcon: ReactNode, defaultCloseIcon: ReactNode) {
  return typeof closeIcon === 'boolean' || closeIcon === undefined || closeIcon === null
    ? defaultCloseIcon
    : closeIcon;
}

function getClosable(
  closable?: UseClosableParams['closable'],
  closeIcon?: ReactNode,
  defaultClosable?: boolean,
  defaultCloseIcon?: ReactNode,
): [closable: boolean, closeIcon: React.ReactNode] {
  const mergedDefaultClosableIcon = defaultClosable ? defaultCloseIcon : null;
  if (typeof closable === 'boolean') {
    return [closable, closable ? getMergedCloseIcon(closeIcon, defaultCloseIcon) : null];
  }
  if (typeof closable === 'object') {
    return [true, getMergedCloseIcon(closeIcon, defaultCloseIcon)];
  }
  if (closeIcon === undefined) {
    return [!!defaultClosable, mergedDefaultClosableIcon];
  }
  const curClosable = closeIcon !== false && closeIcon !== null;
  return [curClosable, curClosable ? getMergedCloseIcon(closeIcon, defaultCloseIcon) : null];
}

function getAriaProps(closable: BaseClosableType) {
  return pickAttrs(closable, true);
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

function notUndefined(val: any) {
  return val !== undefined;
}

function getConfigByClosable(
  closable: ClosableType | undefined,
  closeIcon: ReactNode,
  defaultCloseIcon: ReactNode,
  preset: boolean,
) {
  if (typeof closable === 'object' && closable.closeIcon) {
    return {
      closeIcon: getCloseIcon(closable.closeIcon, defaultCloseIcon),
      ...closable,
    };
  }
  if (closable === false) {
    return null;
  }
  if (preset) {
    return {
      closeIcon: getCloseIcon(closeIcon, defaultCloseIcon),
    };
  }
  return notUndefined(closeIcon)
    ? {
        closeIcon,
      }
    : null;
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
  const contextConfig = getConfigByClosable(
    context?.closable,
    context?.closeIcon,
    defaultCloseIcon,
    true,
  );
  const propConfig = getConfigByClosable(closable, closeIcon, defaultCloseIcon, false);

  let curCloseIcon: ReactNode = null;
  if (propConfig) {
    curCloseIcon = propConfig.closeIcon;
  } else if (contextConfig) {
    curCloseIcon = contextConfig.closeIcon;
  }

  const [mergedClosable, mergedCloseIcon] = getClosable(
    closable ?? context?.closable,
    curCloseIcon,
    defaultClosable,
    defaultCloseIcon,
  );

  if (!mergedClosable) {
    return null;
  }

  const ariaProps = getAriaProps(propConfig ?? contextConfig ?? {}) ?? {};
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
