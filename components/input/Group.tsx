import * as React from 'react';
import classNames from 'classnames';

export interface GroupProps {
  className?: string;
  size?: 'large' | 'small' | 'default';
  children?: any;
  style?: React.CSSProperties;
  prefixCls?: string;
}

const Group: React.StatelessComponent<GroupProps> = (props) => {
  const className = classNames({
    [props.prefixCls]: true,
    [`${props.prefixCls}-lg`]: props.size === 'large',
    [`${props.prefixCls}-sm`]: props.size === 'small',
    [props.className]: !!props.className,
  });
  return (
    <span className={className} style={props.style}>
      {props.children}
    </span>
  );
};

Group.propTypes = {
  children: React.PropTypes.any,
};

Group.defaultProps = {
  prefixCls: 'ant-input-group',
};

export default Group;
