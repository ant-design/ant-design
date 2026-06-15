import * as React from 'react';
import { toArray, useLayoutEffect } from '@rc-component/util';
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
  compactItemId?: React.Key;
  registerCompactItem?: (itemId: React.Key) => () => void;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType | null>(
  null,
);

export const useCompactItemContext = (prefixCls: string, direction: DirectionType) => {
  const compactItemContext = React.useContext(SpaceCompactItemContext);

  useLayoutEffect(() => {
    if (compactItemContext?.compactItemId == null || !compactItemContext.registerCompactItem) {
      return;
    }

    return compactItemContext.registerCompactItem(compactItemContext.compactItemId);
  }, [compactItemContext?.compactItemId, compactItemContext?.registerCompactItem]);

  const compactItemClassnames = React.useMemo<string>(() => {
    if (!compactItemContext) {
      return '';
    }
    const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-';

    return clsx(`${prefixCls}-compact${separator}item`, {
      [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls}-compact${separator}item-rtl`]: direction === 'rtl',
    });
  }, [prefixCls, direction, compactItemContext]);

  return {
    compactSize: compactItemContext?.compactSize,
    compactDirection: compactItemContext?.compactDirection,
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
  const {
    compactSize,
    compactDirection,
    isFirstItem,
    isLastItem,
    compactItemId,
    registerCompactItem,
  } = others;
  const contextValue = React.useMemo<SpaceCompactItemContextType>(
    () => ({
      compactSize,
      compactDirection,
      isFirstItem,
      isLastItem,
      compactItemId,
      registerCompactItem,
    }),
    [compactSize, compactDirection, isFirstItem, isLastItem, compactItemId, registerCompactItem],
  );

  return (
    <SpaceCompactItemContext.Provider value={contextValue}>
      {children}
    </SpaceCompactItemContext.Provider>
  );
};

const getCompactItemKey = (child: React.ReactNode, index: number, prefixCls: string) =>
  React.isValidElement(child) && child.key != null ? child.key : `${prefixCls}-item-${index}`;

const isVisibleNonCompactItem = (child: React.ReactNode) =>
  (typeof child === 'string' && child !== '') ||
  typeof child === 'number' ||
  (React.isValidElement(child) && typeof child.type === 'string');

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

  const childNodes = toArray(children) as React.ReactNode[];

  useLayoutEffect(() => {
    if (
      childNodes.length === 0 ||
      compactItemContext?.compactItemId == null ||
      !compactItemContext.registerCompactItem
    ) {
      return;
    }

    return compactItemContext.registerCompactItem(compactItemContext.compactItemId);
  }, [
    childNodes.length,
    compactItemContext?.compactItemId,
    compactItemContext?.registerCompactItem,
  ]);

  const itemKeys = React.useMemo(
    () => childNodes.map((child, i) => getCompactItemKey(child, i, prefixCls)),
    [childNodes, prefixCls],
  );
  const registeredItemCountRef = React.useRef<Map<React.Key, number>>(new Map());
  const [registeredItemIds, setRegisteredItemIds] = React.useState<Set<React.Key>>(() => new Set());

  const registerCompactItem = React.useCallback((itemId: React.Key) => {
    const count = registeredItemCountRef.current.get(itemId) ?? 0;

    registeredItemCountRef.current.set(itemId, count + 1);

    if (count === 0) {
      setRegisteredItemIds((prevIds) => {
        const nextIds = new Set(prevIds);
        nextIds.add(itemId);
        return nextIds;
      });
    }

    return () => {
      const latestCount = registeredItemCountRef.current.get(itemId) ?? 0;

      if (latestCount <= 1) {
        registeredItemCountRef.current.delete(itemId);
        setRegisteredItemIds((prevIds) => {
          const nextIds = new Set(prevIds);
          nextIds.delete(itemId);
          return nextIds;
        });
      } else {
        registeredItemCountRef.current.set(itemId, latestCount - 1);
      }
    };
  }, []);

  const visibleItemKeys = React.useMemo(
    () =>
      registeredItemIds.size
        ? itemKeys.filter(
            (key, index) =>
              registeredItemIds.has(key) || isVisibleNonCompactItem(childNodes[index]),
          )
        : itemKeys,
    [childNodes, itemKeys, registeredItemIds],
  );
  const firstVisibleItemKey = visibleItemKeys[0];
  const lastVisibleItemKey = visibleItemKeys[visibleItemKeys.length - 1];

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = itemKeys[i];
        return (
          <CompactItem
            key={key}
            compactItemId={key}
            registerCompactItem={registerCompactItem}
            compactSize={mergedSize}
            compactDirection={mergedOrientation}
            isFirstItem={
              key === firstVisibleItemKey &&
              (!compactItemContext || compactItemContext?.isFirstItem)
            }
            isLastItem={
              key === lastVisibleItemKey && (!compactItemContext || compactItemContext?.isLastItem)
            }
          >
            {child}
          </CompactItem>
        );
      }),
    [
      childNodes,
      compactItemContext,
      firstVisibleItemKey,
      itemKeys,
      lastVisibleItemKey,
      mergedOrientation,
      mergedSize,
      registerCompactItem,
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
