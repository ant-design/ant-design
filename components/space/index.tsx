import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';

export interface SpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: 'horizontal' | 'vertical';
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline';
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

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
    prefixCls: customizePrefixCls,
    ...otherProps
  } = props;

  const len = React.Children.count(children);

  if (len === 0) {
    return null;
  }

  const mergedAlign = align === undefined && direction === 'horizontal' ? 'center' : align;
  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const cn = classNames(
    prefixCls,
    `${prefixCls}-${direction}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
    },
    className,
  );

  const itemClassName = `${prefixCls}-item`;

  const marginDirection = directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

  return (
    <div className={cn} {...otherProps}>
      {React.Children.map(children, (child, i) => (
        <div
          className={itemClassName}
          // eslint-disable-next-line react/no-array-index-key
          key={`${itemClassName}-${i}`}
          style={
            i === len - 1 || child === null || child === undefined
              ? {}
              : {
                  [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                    typeof size === 'string' ? spaceSize[size] : size,
                }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Space;
