import * as React from 'react';
import { toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import { useOrientation } from '../_util/hooks';
import type { Orientation } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style/compact';

export interface SpaceCompactItemContextType {
  compactSize?: SizeType;
  compactDirection?: 'horizontal' | 'vertical';
  isFirstItem?: boolean;
  isLastItem?: boolean;
  compactItemKey?: React.Key;
  registerItem?: (key: React.Key) => void;
  deregisterItem?: (key: React.Key) => void;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType | null>(
  null,
);

export const useCompactItemContext = (prefixCls: string, direction: DirectionType) => {
  const compactItemContext = React.useContext(SpaceCompactItemContext);

  const {
    compactDirection,
    compactItemKey,
    compactSize,
    deregisterItem,
    isFirstItem,
    isLastItem,
    registerItem,
  } = compactItemContext || {};

  React.useEffect(() => {
    if (compactItemKey === undefined || !registerItem || !deregisterItem) {
      return;
    }

    registerItem(compactItemKey);

    return () => {
      deregisterItem(compactItemKey);
    };
  }, [compactItemKey, deregisterItem, registerItem]);

  const compactItemClassnames = React.useMemo<string>(() => {
    if (!compactItemContext) {
      return '';
    }

    const separator = compactDirection === 'vertical' ? '-vertical-' : '-';

    return clsx(`${prefixCls}-compact${separator}item`, {
      [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls}-compact${separator}item-rtl`]: direction === 'rtl',
    });
  }, [compactDirection, compactItemContext, direction, isFirstItem, isLastItem, prefixCls]);

  return {
    compactSize,
    compactDirection,
    compactItemClassnames,
  };
};

export const NoCompactStyle: React.FC<Readonly<React.PropsWithChildren>> = (props) => {
  const { children } = props;
  return (
    <SpaceCompactItemContext.Provider value={null}>{children}</SpaceCompactItemContext.Provider>
  );
};

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  size?: SizeType;
  /** @deprecated please use `orientation` instead */
  direction?: Orientation;
  orientation?: Orientation;
  vertical?: boolean;
  block?: boolean;
  rootClassName?: string;
}

const CompactItem: React.FC<React.PropsWithChildren<SpaceCompactItemContextType>> = (props) => {
  const { children, ...others } = props;
  return (
    <SpaceCompactItemContext.Provider
      value={React.useMemo<SpaceCompactItemContextType>(() => others, [others])}
    >
      {children}
    </SpaceCompactItemContext.Provider>
  );
};

const Compact: React.FC<SpaceCompactProps> = (props) => {
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const {
    size,
    direction,
    orientation,
    block,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    vertical,
    ...restProps
  } = props;

  // ======================== Warning ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Space.Compact');
    warning.deprecated(!direction, 'direction', 'orientation');
  }

  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
  const mergedSize = useSize((ctx) => size ?? ctx);

  const prefixCls = getPrefixCls('space-compact', customizePrefixCls);
  const [hashId] = useStyle(prefixCls);
  const clx = clsx(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-vertical`]: mergedVertical,
    },
    className,
    rootClassName,
  );

  const compactItemContext = React.useContext(SpaceCompactItemContext);

  const childNodes = toArray(children).filter(React.isValidElement);
  const [registeredItemKeys, setRegisteredItemKeys] = React.useState<React.Key[]>([]);

  const registerItem = React.useCallback((itemKey: React.Key) => {
    setRegisteredItemKeys((prevKeys) => {
      if (prevKeys.includes(itemKey)) {
        return prevKeys;
      }
      return [...prevKeys, itemKey];
    });
  }, []);

  const deregisterItem = React.useCallback((itemKey: React.Key) => {
    setRegisteredItemKeys((prevKeys) => prevKeys.filter((key) => key !== itemKey));
  }, []);

  const firstItemKey = registeredItemKeys[0];
  const lastItemKey = registeredItemKeys[registeredItemKeys.length - 1];

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = child?.key ?? `${prefixCls}-item-${i}`;
        const isFirstItem = firstItemKey !== undefined ? key === firstItemKey : i === 0;
        const isLastItem =
          lastItemKey !== undefined ? key === lastItemKey : i === childNodes.length - 1;

        return (
          <CompactItem
            key={key}
            compactSize={mergedSize}
            compactDirection={mergedOrientation}
            isFirstItem={isFirstItem && (!compactItemContext || compactItemContext?.isFirstItem)}
            isLastItem={isLastItem && (!compactItemContext || compactItemContext?.isLastItem)}
            compactItemKey={key}
            registerItem={registerItem}
            deregisterItem={deregisterItem}
          >
            {child}
          </CompactItem>
        );
      }),
    [
      childNodes,
      compactItemContext,
      deregisterItem,
      firstItemKey,
      lastItemKey,
      mergedOrientation,
      mergedSize,
      prefixCls,
      registerItem,
    ],
  );

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  return (
    <div className={clx} {...restProps}>
      {nodes}
    </div>
  );
};

export default Compact;
