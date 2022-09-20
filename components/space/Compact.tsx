import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';

import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';

export interface SpaceCompactItemContextType {
  size?: SizeType;
  direction?: 'horizontal' | 'vertical';
  isItem?: boolean;
  isFirstItem?: boolean;
  isLastItem?: boolean;
}

export const SpaceCompactItemContext = React.createContext<SpaceCompactItemContextType>({});

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

  const childNodes = toArray(children, { keepEmpty: true });

  const nodes = React.useMemo(
    () =>
      childNodes.map((child, i) => {
        const key = (child && child.key) || `${prefixCls}-item-${i}`;

        return (
          <CompactItem
            key={key}
            size={size}
            direction={direction}
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
