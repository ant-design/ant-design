import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { DialogProps } from '@rc-component/dialog';
import pickAttrs from '@rc-component/util/lib/pickAttrs';

import { useLocale } from '../../locale';
import defaultLocale from '../../locale/en_US';
import type { HTMLAriaDataAttributes } from '../aria-data-attrs';
import extendsObject from '../extendsObject';

export type ClosableType = DialogProps['closable'];

export type BaseContextClosable = { closable?: ClosableType; closeIcon?: ReactNode };
export type ContextClosable<T extends BaseContextClosable = any> = Partial<
  Pick<T, 'closable' | 'closeIcon'>
>;

export function pickClosable<T extends BaseContextClosable>(
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

    let closableConfig: ClosableType = {
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

/** Collection contains the all the props related with closable. e.g. `closable`, `closeIcon` */
interface ClosableCollection {
  closable?: ClosableType;
  closeIcon?: ReactNode;
}

interface FallbackCloseCollection extends ClosableCollection {
  /**
   * Some components need to wrap CloseIcon twice,
   * this method will be executed once after the final CloseIcon is calculated
   */
  closeIconRender?: (closeIcon: ReactNode) => ReactNode;
}

/** Use same object to support `useMemo` optimization */
const EmptyFallbackCloseCollection: ClosableCollection = {};

type DataAttributes = {
  [key: `data-${string}`]: string;
};

export default function useClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: FallbackCloseCollection = EmptyFallbackCloseCollection,
): [
  closable: boolean,
  closeIcon: React.ReactNode,
  closeBtnIsDisabled: boolean,
  ariaOrDataProps: React.AriaAttributes & DataAttributes,
] {
  // Align the `props`, `context` `fallback` to config object first
  const propCloseConfig = useClosableConfig(propCloseCollection);
  const contextCloseConfig = useClosableConfig(contextCloseCollection);

  const [contextLocale] = useLocale('global', defaultLocale.global);
  const closeBtnIsDisabled =
    typeof propCloseConfig !== 'boolean' ? !!propCloseConfig?.disabled : false;
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
      return extendsObject(mergedFallbackCloseCollection, contextCloseConfig, propCloseConfig);
    }

    // =============== Context Second ==============
    // Skip if context is disabled
    if (contextCloseConfig === false) {
      return false;
    }

    if (contextCloseConfig) {
      return extendsObject(mergedFallbackCloseCollection, contextCloseConfig);
    }

    // ============= Fallback Default ==============
    return !mergedFallbackCloseCollection.closable ? false : mergedFallbackCloseCollection;
  }, [propCloseConfig, contextCloseConfig, mergedFallbackCloseCollection]);

  // Calculate the final closeIcon
  return React.useMemo(() => {
    if (mergedClosableConfig === false) {
      return [false, null, closeBtnIsDisabled, {}];
    }

    const { closeIconRender } = mergedFallbackCloseCollection;
    const { closeIcon } = mergedClosableConfig;

    let mergedCloseIcon: ReactNode = closeIcon;
    // Wrap the closeIcon with aria props
    const ariaOrDataProps = pickAttrs(mergedClosableConfig, true);
    if (mergedCloseIcon !== null && mergedCloseIcon !== undefined) {
      // Wrap the closeIcon if needed
      if (closeIconRender) {
        mergedCloseIcon = closeIconRender(closeIcon);
      }
      mergedCloseIcon = React.isValidElement(mergedCloseIcon) ? (
        React.cloneElement(mergedCloseIcon, {
          'aria-label': contextLocale.close,
          ...ariaOrDataProps,
        } as HTMLAriaDataAttributes)
      ) : (
        <span aria-label={contextLocale.close} {...ariaOrDataProps}>
          {mergedCloseIcon}
        </span>
      );
    }

    return [true, mergedCloseIcon, closeBtnIsDisabled, ariaOrDataProps];
  }, [mergedClosableConfig, mergedFallbackCloseCollection]);
}

function createClosableConfig(closableCollection?: ClosableCollection | null) {
  const { closable, closeIcon } = closableCollection || {};

  // 移除useMemo，直接计算
  if (!closable && (closable === false || closeIcon === false || closeIcon === null)) {
    return false;
  }

  if (closable === undefined && closeIcon === undefined) {
    return null;
  }

  let closableConfig: ClosableType = {
    closeIcon: typeof closeIcon !== 'boolean' && closeIcon !== null ? closeIcon : undefined,
  };

  if (closable && typeof closable === 'object') {
    closableConfig = {
      ...closableConfig,
      ...closable,
    };
  }

  return closableConfig;
}

export function computeClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: ClosableCollection & {
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
  } = { closable: true, closeIcon: <CloseOutlined /> },
): [boolean, React.ReactNode, boolean, React.AriaAttributes] {
  // 同步计算配置
  const propCloseConfig = createClosableConfig(propCloseCollection);
  const contextCloseConfig = createClosableConfig(contextCloseCollection);

  // 计算fallback
  const mergedFallback = {
    closeIcon: <CloseOutlined />,
    ...fallbackCloseCollection,
  };

  const closeBtnIsDisabled =
    typeof propCloseConfig !== 'boolean' ? !!propCloseConfig?.disabled : false;

  // 合并配置逻辑
  let mergedClosableConfig: any;

  if (propCloseConfig === false) {
    mergedClosableConfig = false;
  } else if (propCloseConfig) {
    mergedClosableConfig = assignWithoutUndefined(
      mergedFallback,
      contextCloseConfig,
      propCloseConfig,
    );
  } else if (contextCloseConfig === false) {
    mergedClosableConfig = false;
  } else if (contextCloseConfig) {
    mergedClosableConfig = assignWithoutUndefined(mergedFallback, contextCloseConfig);
  } else {
    mergedClosableConfig = !mergedFallback.closable ? false : mergedFallback;
  }

  // 处理最终结果
  if (mergedClosableConfig === false) {
    return [false, null, closeBtnIsDisabled, {}];
  }

  const { closeIconRender } = mergedFallback;
  const { closeIcon } = mergedClosableConfig;

  let mergedCloseIcon: ReactNode = closeIcon;
  const ariaProps = pickAttrs(mergedClosableConfig, true);

  if (mergedCloseIcon !== null && mergedCloseIcon !== undefined) {
    if (closeIconRender) {
      mergedCloseIcon = closeIconRender(closeIcon);
    }

    if (Object.keys(ariaProps).length) {
      mergedCloseIcon = React.isValidElement(mergedCloseIcon) ? (
        React.cloneElement(mergedCloseIcon, ariaProps)
      ) : (
        <span {...ariaProps}>{mergedCloseIcon}</span>
      );
    }
  }

  return [true, mergedCloseIcon, closeBtnIsDisabled, ariaProps];
}
