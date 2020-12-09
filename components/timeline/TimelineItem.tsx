import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';

export interface TimelineItemProps {
  prefixCls?: string;
  className?: string;
  color?: string;
  dot?: React.ReactNode;
  pending?: boolean;
  position?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
}

// for compatibililty
// https://github.com/ant-design/ant-design/pull/26832
export interface TimeLineItemProps extends TimelineItemProps {
  __deprecated_do_not_use_it__?: any; // eslint-disable-line camelcase
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  prefixCls: customizePrefixCls,
  className,
  color = 'blue',
  dot,
  pending = false,
  position /** dead, but do not pass in <li {...omit()} */,
  label,
  children,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

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
    <li {...restProps} className={itemClassName}>
      {label && <div className={`${prefixCls}-item-label`}>{label}</div>}
      <div className={`${prefixCls}-item-tail`} />
      <div
        className={dotClassName}
        style={{ borderColor: /blue|red|green|gray/.test(color || '') ? undefined : color }}
      >
        {dot}
      </div>
      <div className={`${prefixCls}-item-content`}>{children}</div>
    </li>
  );
};

export default TimelineItem;
