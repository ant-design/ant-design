import React from 'react';
import classNames from 'classnames';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: any;
  style?: React.CSSProperties;
  prefixCls?: string;
}

const Group: React.StatelessComponent<GroupProps> = (props) => {
  const { prefixCls = 'ant-input-group', className = '' } = props;
  const cls = classNames({
    [prefixCls]: true,
    [`${prefixCls}-lg`]: props.size === 'large',
    [`${prefixCls}-sm`]: props.size === 'small',
    [className]: !!className,
  });
  return (
    <span className={cls} style={props.style}>
      {props.children}
    </span>
  );
};

Group.propTypes = {
  children: React.PropTypes.any,
};

export default Group;
