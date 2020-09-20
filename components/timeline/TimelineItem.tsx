import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
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

const TimelineItem: React.FC<TimelineItemProps> = props => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    color,
    children,
    pending,
    dot,
    label,
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

TimelineItem.defaultProps = {
  color: 'blue',
  pending: false,
  position: '',
};

export default TimelineItem;
