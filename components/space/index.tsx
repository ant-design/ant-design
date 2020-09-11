import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { useMediaQuery } from 'react-responsive';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';
import Item from './Item';
import { Breakpoint, responsiveMap } from '../_util/responsiveObserve';

export const LastIndexContext = React.createContext(0);

export type Directions = 'horizontal' | 'vertical';

export interface SpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: Directions;
  responsiveFrom?: Breakpoint;
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline';
}

const Space: React.FC<SpaceProps> = props => {
  const { getPrefixCls, space, direction: directionConfig }: ConfigConsumerProps = React.useContext(
    ConfigContext,
  );

  const {
    size = space?.size || 'small',
    align,
    className,
    children,
    direction = 'horizontal',
    responsiveFrom,
    prefixCls: customizePrefixCls,
    ...otherProps
  } = props;
  const queryMatches = useMediaQuery({ query: responsiveMap[responsiveFrom || 'xs'] });
  const inverseDirection = responsiveFrom && queryMatches;
  const childNodes = toArray(children, { keepEmpty: true });

  if (childNodes.length === 0) {
    return null;
  }

  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${inverseDirection ? 'vertical' : direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-responsive`]: inverseDirection,
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const itemClassName = `${prefixCls}-item`;

  const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    /* eslint-disable react/no-array-index-key */
    return (
      <Item
        className={itemClassName}
        key={`${itemClassName}-${i}`}
        direction={direction}
        inverseDirection={inverseDirection}
        size={size}
        index={i}
        marginDirection={marginDirection}
      >
        {child}
      </Item>
    );
    /* eslint-enable */
  });

  return (
    <div className={cn} {...otherProps}>
      <LastIndexContext.Provider value={latestIndex}>{nodes}</LastIndexContext.Provider>
    </div>
  );
};

export default Space;
