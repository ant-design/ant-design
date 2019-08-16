import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface TimeLineItemProps {
  prefixCls?: string;
  className?: string;
  color?: string;
  label?: string;
  dot?: React.ReactNode;
  pending?: boolean;
  position?: string;
  style?: React.CSSProperties;
}

const TimelineItem: React.SFC<TimeLineItemProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        className,
        color = '',
        label,
        children,
        pending,
        dot,
        ...restProps
      } = props;

      const prefixCls = getPrefixCls('timeline', customizePrefixCls);
      const itemClassName = classNames(
        {
          [`${prefixCls}-item`]: true,
          [`${prefixCls}-item-pending`]: pending,
        },
        className,
      );

      const dotClassName = classNames({
        [`${prefixCls}-item-head`]: true,
        [`${prefixCls}-item-head-custom`]: dot,
        [`${prefixCls}-item-head-${color}`]: true,
      });

      return (
        <li {...omit(restProps, ['position'])} className={itemClassName}>
          <div className={`${prefixCls}-item-tail`} />
          <div
            className={dotClassName}
            style={{ borderColor: /blue|red|green|gray/.test(color) ? undefined : color }}
          >
            {dot}
          </div>
          {!!label && <div className={`${prefixCls}-item-label`}>{label}</div>}
          <div className={`${prefixCls}-item-content`}>{children}</div>
        </li>
      );
    }}
  </ConfigConsumer>
);

TimelineItem.defaultProps = {
  color: 'blue',
  pending: false,
  position: '',
};

export default TimelineItem;
