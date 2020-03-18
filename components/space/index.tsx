import * as React from 'react';
import classnames from 'classnames';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';
import { SizeType } from '../config-provider/SizeContext';

export interface SpaceProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | number;
  direction?: 'horizontal' | 'vertical';
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

const Space: React.FC<SpaceProps> = props => {
  const { getPrefixCls, space }: ConfigConsumerProps = React.useContext(ConfigContext);

  const {
    size = space?.size || 'small',
    className,
    children,
    direction = 'horizontal',
    prefixCls: customizePrefixCls,
    ...otherProps
  } = props;

  if (children === null || children === undefined) {
    return null;
  }

  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const cn = classnames(prefixCls, className);

  const injectStyles = (isLast: boolean) => {
    if (isLast) {
      return {};
    }
    return {
      [direction === 'vertical' ? 'marginBottom' : 'marginRight']:
        typeof size === 'string' ? spaceSize[size] : size,
    };
  };

  const items = React.Children.toArray(children);
  const len = items.length;

  return (
    <div className={cn} {...otherProps}>
      {items.map((child, i) => {
        return React.isValidElement(child)
          ? React.cloneElement(child, {
              style: {
                ...child.props.style,
                ...injectStyles(i === len - 1),
              },
            })
          : child;
      })}
    </div>
  );
};

export default Space;
