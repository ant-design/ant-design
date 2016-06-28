import React from 'react';
import splitObject from '../_util/splitObject';

export default props => {
  const [{type, className = ''}, others] = splitObject(props,
    ['type','className']);

  let className2 = `${className} anticon anticon-${type}`.trim();
  return <i className={className2} {...others} />;
};
