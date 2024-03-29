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

/** Convert `closable` and `closeIcon` to config object */
function useClosableConfig(closableCollection?: ClosableCollection | null) {
  const { closable, closeIcon } = closableCollection || {};

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
  contextCloseCollection?: ClosableCollection | null,
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
    return !mergedFallbackCloseCollection.closable ? false : mergedFallbackCloseCollection;
  }, [propCloseConfig, contextCloseConfig, mergedFallbackCloseCollection]);

  // Calculate the final closeIcon
  return React.useMemo(() => {
    if (mergedClosableConfig === false) {
      return [false, null];
    }

    const { closeIconRender } = mergedFallbackCloseCollection;
    const { closeIcon } = mergedClosableConfig;

    let mergedCloseIcon: ReactNode = closeIcon;
    if (mergedCloseIcon !== null && mergedCloseIcon !== undefined) {
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
