import * as React from 'react';
import classNames from 'classnames';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: any;
  style?: React.CSSProperties;
  prefixCls?: string;
  compact?: boolean;
}

const Group: React.StatelessComponent<GroupProps> = (props) => {
  const { prefixCls = 'ant-input-group', className = '' } = props;
  const cls = classNames(prefixCls, {
    [`${prefixCls}-lg`]: props.size === 'large',
    [`${prefixCls}-sm`]: props.size === 'small',
    [`${prefixCls}-compact`]: props.compact,
  }, className);
  return (
    <span className={cls} style={props.style}>
      {props.children}
    </span>
  );
};

export default Group;
