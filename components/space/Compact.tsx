import * as React from 'react';
import { toArray } from '@rc-component/util';
import classNames from 'classnames';

import type { Orientation } from '../_util/hooks/useOrientation';
import useOrientation from '../_util/hooks/useOrientation';
import { devUseWarning } from '../_util/warning';
import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export interface SpaceCompactItemContextType {
  compactSize?: SizeType;
  compactDirection?: 'horizontal' | 'vertical';
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType | null>(
  null,
);

export const useCompactItemContext = (prefixCls: string, direction: DirectionType) => {
  const compactItemContext = React.useContext(SpaceCompactItemContext);

  const compactItemClassnames = React.useMemo<string>(() => {
    if (!compactItemContext) {
      return '';
    }
    const { compactDirection, isFirstItem, isLastItem } = compactItemContext;
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-';

    return classNames(`${prefixCls}-compact${separator}item`, {
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
  const clx = classNames(
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

  const childNodes = toArray(children);

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = child?.key || `${prefixCls}-item-${i}`;
        return (
          <CompactItem
            key={key}
            compactSize={mergedSize}
            compactDirection={mergedOrientation}
            isFirstItem={i === 0 && (!compactItemContext || compactItemContext?.isFirstItem)}
            isLastItem={
              i === childNodes.length - 1 && (!compactItemContext || compactItemContext?.isLastItem)
            }
          >
            {child}
          </CompactItem>
        );
      }),
    [size, childNodes, compactItemContext],
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
