import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { DialogProps } from '@rc-component/dialog';
import pickAttrs from '@rc-component/util/lib/pickAttrs';

import { useLocale } from '../../locale';
import defaultLocale from '../../locale/en_US';
import type { HTMLAriaDataAttributes } from '../aria-data-attrs';

export type ClosableType = DialogProps['closable'];

// ======================== Common Type Definitions ========================
export type BaseContextClosable = { closable?: ClosableType; closeIcon?: ReactNode };
export type ContextClosable<T extends BaseContextClosable = any> = Partial<
  Pick<T, 'closable' | 'closeIcon'>
>;

export interface ClosableCollection {
  closable?: ClosableType;
  closeIcon?: ReactNode;
  disabled?: boolean;
}

type DataAttributes = {
  [key: `data-${string}`]: string;
};

// ======================== Utility Functions ========================
export function pickClosable<T extends BaseContextClosable>(
  context?: ContextClosable<T>,
): ContextClosable<T> | undefined {
  if (!context) return undefined;
  return { closable: context.closable, closeIcon: context.closeIcon };
}

function getClosableConfig(collection?: ClosableCollection | null) {
  const { closable, closeIcon } = collection || {};

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
    closableConfig = { ...closableConfig, ...closable };
  }

  return closableConfig;
}

function assignWithoutUndefined<T extends object>(
  ...objList: (Partial<T> | false | null | undefined)[]
): Partial<T> {
  const target: Partial<T> = {};
  objList.forEach((obj) => {
    if (obj) {
      (Object.keys(obj) as (keyof T)[]).forEach((key) => {
        if (obj[key] !== undefined) target[key] = obj[key];
      });
    }
  });
  return target;
}

function mergeClosableConfig(
  propConfig: ReturnType<typeof getClosableConfig>,
  contextConfig: ReturnType<typeof getClosableConfig>,
  fallbackConfig: ClosableCollection & { closeIconRender?: (icon: ReactNode) => ReactNode },
) {
  if (propConfig === false) return false;
  if (propConfig) return assignWithoutUndefined(fallbackConfig, contextConfig, propConfig);
  if (contextConfig === false) return false;
  if (contextConfig) return assignWithoutUndefined(fallbackConfig, contextConfig);
  return !fallbackConfig.closable ? false : fallbackConfig;
}

const EmptyFallbackCloseCollection: ClosableCollection = {};

// ======================== Core Calculation Method ========================
export function computeClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: ClosableCollection & {
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
  } = EmptyFallbackCloseCollection,
  localeCloseText: string = defaultLocale.global?.close || 'Close',
): [
  closable: boolean,
  closeIcon: React.ReactNode,
  closeBtnIsDisabled: boolean,
  ariaOrDataProps: React.AriaAttributes & DataAttributes,
] {
  const propConfig = getClosableConfig(propCloseCollection);
  const contextConfig = getClosableConfig(contextCloseCollection);

  const mergedConfig = mergeClosableConfig(propConfig, contextConfig, {
    closeIcon: <CloseOutlined />,
    ...fallbackCloseCollection,
  });

  const closeBtnIsDisabled = typeof mergedConfig !== 'boolean' ? !!mergedConfig?.disabled : false;

  if (mergedConfig === false) {
    return [false, null, closeBtnIsDisabled, {}];
  }

  const { closeIconRender } = fallbackCloseCollection;
  let { closeIcon } = mergedConfig;

  const ariaOrDataProps = pickAttrs(mergedConfig, true);

  if (closeIcon != null) {
    if (closeIconRender) {
      closeIcon = closeIconRender(closeIcon);
    }

    closeIcon = React.isValidElement(closeIcon) ? (
      React.cloneElement(closeIcon, {
        'aria-label': localeCloseText,
        ...ariaOrDataProps,
      } as HTMLAriaDataAttributes)
    ) : (
      <span aria-label={localeCloseText} {...ariaOrDataProps}>
        {closeIcon}
      </span>
    );
  }

  return [true, closeIcon, closeBtnIsDisabled, ariaOrDataProps];
}

// ======================== Hook Version ========================
export default function useClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: ClosableCollection & {
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
  } = EmptyFallbackCloseCollection,
) {
  const [contextLocale] = useLocale('global', defaultLocale.global);

  return React.useMemo(
    () =>
      computeClosable(
        propCloseCollection,
        contextCloseCollection,
        fallbackCloseCollection,
        contextLocale.close,
      ),
    [propCloseCollection, contextCloseCollection, fallbackCloseCollection, contextLocale.close],
  );
}
