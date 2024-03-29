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

function getClosableConfig1(props: UseClosableParams): ClosableConfig | null {
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

function useClosable1(
  props: UseClosableParams,
): [closable: boolean, closeIcon: React.ReactNode | null] {
  const closableConfig = getClosableConfig1(props);
  if (!closableConfig) {
    return [false, null];
  }
  const mergedCloseIcon = getDisplayCloseIcon(props, closableConfig);

  return [true, mergedCloseIcon];
}

/** Convert `closable` and `closeIcon` to config object */
function useClosableConfig(closableCollection: ClosableCollection = {}) {
  const { closable, closeIcon } = closableCollection;

  return React.useMemo(() => {
    if (
      // If `closable`, whatever rest be should be true
      !closable &&
      (closable === false || closeIcon === false || closeIcon === null)
    ) {
      return false;
    }

    if (closable === undefined && closeIcon === undefined) {
      return null;
    }

    let closableConfig: BaseClosableType = {
      closeIcon: typeof closeIcon !== 'boolean' && closeIcon !== null ? closeIcon : undefined,
    };
    if (closable && typeof closable === 'object') {
      closableConfig = {
        ...closableConfig,
        ...closable,
      };
    }

    return closableConfig;
  }, [closable, closeIcon]);
}

/**
 * Assign object without `undefined` field. Will skip if is `false`.
 * This helps to handle both closableConfig or false
 */
function assignWithoutUndefined<T extends object>(
  ...objList: (Partial<T> | false | null | undefined)[]
): Partial<T> {
  const target: Partial<T> = {};

  objList.forEach((obj) => {
    if (obj) {
      (Object.keys(obj) as (keyof T)[]).forEach((key) => {
        if (obj[key] !== undefined) {
          target[key] = obj[key];
        }
      });
    }
  });

  return target;
}

/** Collection contains the all the props related with closable. e.g. `closable`, `closeIcon` */
interface ClosableCollection {
  closable?: ClosableType;
  closeIcon?: ReactNode;
}

/** Use same object to support `useMemo` optimization */
const EmptyFallbackCloseCollection: ClosableCollection = {};

export default function useClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection,
  fallbackCloseCollection: ClosableCollection & {
    /**
     * Some components need to wrap CloseIcon twice,
     * this method will be executed once after the final CloseIcon is calculated
     */
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
  } = EmptyFallbackCloseCollection,
): [closable: boolean, closeIcon: React.ReactNode | null] {
  // Align the `props`, `context` `fallback` to config object first
  const propCloseConfig = useClosableConfig(propCloseCollection);
  const contextCloseConfig = useClosableConfig(contextCloseCollection);
  const mergedFallbackCloseCollection = React.useMemo(
    () => ({
      closeIcon: <CloseOutlined />,
      ...fallbackCloseCollection,
    }),
    [fallbackCloseCollection],
  );

  // Use fallback logic to fill the config
  const mergedClosableConfig = React.useMemo(() => {
    // ================ Props First ================
    // Skip if prop is disabled
    if (propCloseConfig === false) {
      return false;
    }

    if (propCloseConfig) {
      return assignWithoutUndefined(
        mergedFallbackCloseCollection,
        contextCloseConfig,
        propCloseConfig,
      );
    }

    // =============== Context Second ==============
    // Skip if context is disabled
    if (contextCloseConfig === false) {
      return false;
    }

    if (contextCloseConfig) {
      return assignWithoutUndefined(mergedFallbackCloseCollection, contextCloseConfig);
    }

    // ============= Fallback Default ==============
    return mergedFallbackCloseCollection.closable === false ? false : mergedFallbackCloseCollection;
  }, [propCloseConfig, contextCloseConfig, mergedFallbackCloseCollection]);

  // Calculate the final closeIcon
  return React.useMemo(() => {
    if (mergedClosableConfig === false) {
      return [false, null];
    }

    const { closeIconRender } = mergedFallbackCloseCollection;
    const { closeIcon } = mergedClosableConfig;

    let mergedCloseIcon: ReactNode = closeIcon;
    if (mergedCloseIcon) {
      // Wrap the closeIcon if needed
      if (closeIconRender) {
        mergedCloseIcon = closeIconRender(closeIcon);
      }

      // Wrap the closeIcon with aria props
      const ariaProps = pickAttrs(mergedClosableConfig, true);
      if (Object.keys(ariaProps).length) {
        mergedCloseIcon = React.isValidElement(mergedCloseIcon) ? (
          React.cloneElement(mergedCloseIcon, ariaProps)
        ) : (
          <span {...ariaProps}>{mergedCloseIcon}</span>
        );
      }
    }

    return [true, mergedCloseIcon];
  }, [mergedClosableConfig, mergedFallbackCloseCollection]);
}
