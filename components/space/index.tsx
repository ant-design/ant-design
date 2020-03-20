import * as React from 'react';
import classnames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
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
  const cn = classnames(prefixCls, className, {
    [`${prefixCls}-vertical`]: direction === 'vertical',
    [`${prefixCls}-horizontal`]: direction === 'horizontal',
  });

  const injectStyles = (isLast: boolean) => {
    if (isLast) {
      return {};
    }
    return {
      [direction === 'vertical' ? 'marginBottom' : 'marginRight']:
        typeof size === 'string' ? spaceSize[size] : size,
    };
  };

  const items = toArray(children);

  const len = items.length;
  const itemClassName = `${prefixCls}-item`;

  const transformChild = (child: React.ReactNode, styles: React.CSSProperties) => {
    return (
      <div className={itemClassName} style={styles}>
        {child}
      </div>
    );
  };

  return (
    <div className={cn} {...otherProps}>
      {items.map((child, i) => transformChild(child, injectStyles(i === len - 1)))}
    </div>
  );
};

export default Space;
