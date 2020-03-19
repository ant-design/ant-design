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

  const items = toArray(children);
  const len = items.length;

  const transformChild = (child: React.ReactNode, styles: React.CSSProperties) => {
    if (React.isValidElement(child)) {
      const { type, props: childProps } = child;
      const isPopup = (type as any).__ANT_POPCONFIRM;
      const { style, childStyle } = childProps || {};

      return React.cloneElement(child, {
        [isPopup ? 'childStyle' : 'style']: {
          ...(isPopup ? childStyle : style),
          ...styles,
        },
      });
    }

    return <span style={styles}>{child}</span>;
  };

  return (
    <div className={cn} {...otherProps}>
      {items.map((child, i) => transformChild(child, injectStyles(i === len - 1)))}
    </div>
  );
};

export default Space;
