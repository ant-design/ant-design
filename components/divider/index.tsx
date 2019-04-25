import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | '';
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
}

const Divider: React.SFC<DividerProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        type = 'horizontal',
        orientation = '',
        className,
        children,
        dashed,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls('divider', customizePrefixCls);
      const orientationPrefix = orientation.length > 0 ? '-' + orientation : orientation;
      const classString = classNames(className, prefixCls, `${prefixCls}-${type}`, {
        [`${prefixCls}-with-text${orientationPrefix}`]: children,
        [`${prefixCls}-dashed`]: !!dashed,
      });
      return (
        <div className={classString} {...restProps}>
          {children && <span className={`${prefixCls}-inner-text`}>{children}</span>}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Divider;
