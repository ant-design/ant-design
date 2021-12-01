import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        type = 'horizontal',
        orientation = 'center',
        orientationMargin,
        className,
        children,
        dashed,
        plain,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls('divider', customizePrefixCls);
      const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
      const hasChildren = !!children;
      const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
      const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
      const classString = classNames(
        prefixCls,
        `${prefixCls}-${type}`,
        {
          [`${prefixCls}-with-text`]: hasChildren,
          [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
          [`${prefixCls}-dashed`]: !!dashed,
          [`${prefixCls}-plain`]: !!plain,
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft,
          [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight,
        },
        className,
      );

      const innerStyle = {
        ...(hasCustomMarginLeft && { marginLeft: orientationMargin }),
        ...(hasCustomMarginRight && { marginRight: orientationMargin }),
      };

      return (
        <div className={classString} {...restProps} role="separator">
          {children && (
            <span className={`${prefixCls}-inner-text`} style={innerStyle}>
              {children}
            </span>
          )}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Divider;
