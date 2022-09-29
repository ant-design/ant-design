import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';

import type { DirectionType } from '../config-provider';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';

export interface SpaceCompactItemContextType {
  compactSize?: SizeType;
  compactDirection?: 'horizontal' | 'vertical';
  isItem?: boolean;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType>({});

export const useCompactItemContext = (prefixCls: string, direction: DirectionType) => {
  const { compactSize, compactDirection, isItem, isFirstItem, isLastItem } =
    React.useContext(SpaceCompactItemContext);

  const compactItemClassnames = React.useMemo(() => {
    const separator = compactDirection === 'vertical' ? '-vertical-' : '-';

    return classNames({
      [`${prefixCls}-compact${separator}item`]: isItem,
      [`${prefixCls}-compact${separator}first-item`]: isFirstItem,
      [`${prefixCls}-compact${separator}last-item`]: isLastItem,
      [`${prefixCls}-compact${separator}item-rtl`]: direction === 'rtl',
    });
  }, [prefixCls, compactDirection, direction, isItem, isFirstItem, isLastItem]);

  return {
    compactSize,
    compactDirection,
    compactItemClassnames,
  };
};

export const NoCompactStyle: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const overrideSpaceContext = React.useMemo(() => ({}), []);

  return (
    <SpaceCompactItemContext.Provider value={overrideSpaceContext}>
      {children}
    </SpaceCompactItemContext.Provider>
  );
};

export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
  block?: boolean;
}

const CompactItem: React.FC<React.PropsWithChildren<SpaceCompactItemContextType>> = React.memo(
  ({ children, ...otherProps }) => (
    <SpaceCompactItemContext.Provider value={otherProps}>
      {children}
    </SpaceCompactItemContext.Provider>
  ),
);

const Compact: React.FC<SpaceCompactProps> = props => {
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const {
    size = 'middle',
    direction,
    block,
    prefixCls: customizePrefixCls,
    className,
    children,
    ...otherProps
  } = props;

  const prefixCls = getPrefixCls('space-compact', customizePrefixCls);
  const clx = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-vertical`]: direction === 'vertical',
    },
    className,
  );

  const childNodes = toArray(children, { keepEmpty: false });

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = (child && child.key) || `${prefixCls}-item-${i}`;

        return (
          <CompactItem
            key={key}
            compactSize={size}
            compactDirection={direction}
            isItem
            isFirstItem={i === 0}
            isLastItem={i === childNodes.length - 1}
          >
            {child}
          </CompactItem>
        );
      }),
    [size, childNodes],
  );

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  return (
    <div className={clx} {...otherProps}>
      {nodes}
    </div>
  );
};

export default Compact;
