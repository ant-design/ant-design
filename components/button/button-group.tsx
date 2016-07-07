import * as React from 'react';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

const prefix = 'ant-btn-group-';

export default function ButtonGroup(props) {
  const [{size, className},others] = splitObject(props, ['size', 'className']);

  // large => lg
  // small => sm
  const sizeCls = ({
    large: 'lg',
    small: 'sm',
  })[size] || '';

  const classes = classNames({
    'ant-btn-group': true,
    [prefix + sizeCls]: sizeCls,
    [className]: className,
  });

  return <div {...others} className={classes} />;
}

ButtonGroup.propTypes = {
  size: React.PropTypes.oneOf(['large', 'small']),
};
