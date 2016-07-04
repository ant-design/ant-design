import React, { PropTypes } from 'react';
import classNames from 'classnames';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

export default function Col(props) {
  const { span, order, offset, push, pull, className, children, ...others } = props;
  let sizeClassObj = {};
  ['xs', 'sm', 'md', 'lg'].forEach(size => {
    let sizeProps = {};
    if (typeof props[size] === 'number') {
      sizeProps.span = props[size];
    } else if (typeof props[size] === 'object') {
      sizeProps = props[size] || {};
    }
    delete others[size];
    sizeClassObj = {
      ...sizeClassObj,
      [`ant-col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
      [`ant-col-${size}-order-${sizeProps.order}`]: sizeProps.order,
      [`ant-col-${size}-offset-${sizeProps.offset}`]: sizeProps.offset,
      [`ant-col-${size}-push-${sizeProps.push}`]: sizeProps.push,
      [`ant-col-${size}-pull-${sizeProps.pull}`]: sizeProps.pull,
    };
  });
  const classes = classNames({
    [`ant-col-${span}`]: span !== undefined,
    [`ant-col-order-${order}`]: order,
    [`ant-col-offset-${offset}`]: offset,
    [`ant-col-push-${push}`]: push,
    [`ant-col-pull-${pull}`]: pull,
    [className]: !!className,
    ...sizeClassObj,
  });

  return <div {...others} className={classes}>{children}</div>;
}

Col.propTypes = {
  span: stringOrNumber,
  order: stringOrNumber,
  offset: stringOrNumber,
  push: stringOrNumber,
  pull: stringOrNumber,
  className: PropTypes.string,
  children: PropTypes.node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
};
