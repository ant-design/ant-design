import type { ReactNode } from 'react';
import React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import type { DialogProps } from '@rc-component/dialog';
import pickAttrs from '@rc-component/util/lib/pickAttrs';

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
function createClosableConfig(closableCollection?: ClosableCollection | null) {
  const { closable, closeIcon } = closableCollection || {};

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

function useClosableConfig(closableCollection?: ClosableCollection | null) {
  return React.useMemo(
    () => createClosableConfig(closableCollection),
    [closableCollection?.closable, closableCollection?.closeIcon],
  );
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

type MergedFallbackCollection = ClosableCollection & {
  /**
   * Some components need to wrap CloseIcon twice,
   * this method will be executed once after the final CloseIcon is calculated
   */
  closeIconRender?: (closeIcon: ReactNode) => ReactNode;
};

/** Use same object to support `useMemo` optimization */
const EmptyFallbackCloseCollection: ClosableCollection = {};

const mergedFallback = (fallbackCloseCollection: MergedFallbackCollection) => ({
  closeIcon: <CloseOutlined />,
  ...fallbackCloseCollection,
});

interface mergedClosableConfigFnParams {
  propCloseConfig: ReturnType<typeof createClosableConfig>;
  mergedFallbackCloseCollection: ReturnType<typeof mergedFallback>;
  contextCloseConfig: ReturnType<typeof createClosableConfig>;
}

const mergedClosableConfig = ({
  propCloseConfig,
  mergedFallbackCloseCollection,
  contextCloseConfig,
}: mergedClosableConfigFnParams) => {
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
};
interface ClosableResultParams {
  mergedConfig: ReturnType<typeof mergedClosableConfig>;
  closeBtnIsDisabled: boolean;
  mergedFallbackCloseCollection: ReturnType<typeof mergedFallback>;
}

const closableResult = ({
  mergedConfig,
  closeBtnIsDisabled,
  mergedFallbackCloseCollection,
}: ClosableResultParams): [
  closable: boolean,
  closeIcon: React.ReactNode,
  closeBtnIsDisabled: boolean,
  ariaProps: React.AriaAttributes,
] => {
  if (mergedConfig === false) {
    return [false, null, closeBtnIsDisabled, {}];
  }

  const { closeIconRender } = mergedFallbackCloseCollection;
  const { closeIcon } = mergedConfig;

  let mergedCloseIcon: ReactNode = closeIcon;
  const ariaProps = pickAttrs(mergedConfig, true);

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
};

export default function useClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: MergedFallbackCollection = EmptyFallbackCloseCollection,
): [
  closable: boolean,
  closeIcon: React.ReactNode,
  closeBtnIsDisabled: boolean,
  ariaProps: React.AriaAttributes,
] {
  // Align the `props`, `context` `fallback` to config object first
  const propCloseConfig = useClosableConfig(propCloseCollection);
  const contextCloseConfig = useClosableConfig(contextCloseCollection);
  const closeBtnIsDisabled =
    typeof propCloseConfig !== 'boolean' ? !!propCloseConfig?.disabled : false;
  const mergedFallbackCloseCollection = React.useMemo(
    () => mergedFallback(fallbackCloseCollection),
    [fallbackCloseCollection],
  );

  // Use fallback logic to fill the config
  const mergedConfig = React.useMemo(
    () =>
      mergedClosableConfig({
        propCloseConfig,
        mergedFallbackCloseCollection,
        contextCloseConfig,
      }),
    [propCloseConfig, contextCloseConfig, mergedFallbackCloseCollection],
  );

  // Calculate the final closeIcon
  return React.useMemo(
    () => closableResult({ mergedConfig, closeBtnIsDisabled, mergedFallbackCloseCollection }),
    [mergedConfig, mergedFallbackCloseCollection],
  );
}

export function computeClosable(
  propCloseCollection?: ClosableCollection,
  contextCloseCollection?: ClosableCollection | null,
  fallbackCloseCollection: ClosableCollection & {
    closeIconRender?: (closeIcon: ReactNode) => ReactNode;
  } = { closable: true, closeIcon: <CloseOutlined /> },
): [boolean, React.ReactNode, boolean, React.AriaAttributes] {
  const propCloseConfig = createClosableConfig(propCloseCollection);
  const contextCloseConfig = createClosableConfig(contextCloseCollection);

  const mergedFallbackCloseCollection = mergedFallback(fallbackCloseCollection);

  const closeBtnIsDisabled =
    typeof propCloseConfig !== 'boolean' ? !!propCloseConfig?.disabled : false;

  const mergedConfig = mergedClosableConfig({
    propCloseConfig,
    mergedFallbackCloseCollection,
    contextCloseConfig,
  });

  return closableResult({
    mergedConfig,
    closeBtnIsDisabled,
    mergedFallbackCloseCollection,
  });
}
