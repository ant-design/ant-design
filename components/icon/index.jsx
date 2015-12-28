import React from 'react';

export default props => {
  let { type, className = '', ...other } = props;
  className += ` anticon anticon-${type}`;
  return <i className={className} {...other} />;
};
