import React from 'react';
import rcUtil from 'rc-util';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2,2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}

const prefix = 'ant-btn-';

// Insert one space between two chinese characters automatically.
function insertSpace(child) {
  if (isString(child) && isTwoCNChar(child)) {
    return child.split('').join(' ');
  }

  if (isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
                              child.props.children.split('').join(' '));
  }

  return child;
}

export default class Button extends React.Component {
  render() {
    const props = this.props;
    const {type, shape, size, onClick, className, htmlType, children, ...others} = props;

    const classes = rcUtil.classSet({
      'ant-btn': true,
      [prefix + type]: type,
      [prefix + shape]: shape,
      [prefix + size]: size,
      [prefix + 'loading']: ('loading' in props && props.loading !== false),
      [className]: className
    });

    const kids = React.Children.map(children, insertSpace);

    return <button {...others} type={htmlType || 'button'} className={classes} onClick={onClick}>
      {kids}
    </button>;
  }
}
Button.defaultProps = {
  onClick() {},
};
