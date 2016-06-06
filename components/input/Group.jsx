import React from 'react';
import classNames from 'classnames';

export default function Group(props) {
  const className = classNames({
    'ant-input-group': true,
    'ant-input-group-lg': props.size === 'large',
    'ant-input-group-sm': props.size === 'small',
    [props.className]: !!props.className,
  });
  return (
    <span className={className} style={props.style}>
      {props.children}
    </span>
  );
}

Group.propTypes = {
  children: React.PropTypes.any,
};
