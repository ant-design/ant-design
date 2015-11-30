import React from 'react';

function Icon(props) {
  let {type, className = '', ...other} = props;
  className += ` anticon anticon-${type}`;
  return <i className={className} {...other} />;
}

export default Icon;
