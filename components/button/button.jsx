import React from 'react';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
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

function clearButton(button) {
  button.className = button.className.replace(` ${prefix}clicked`, '');
}

export default class Button extends React.Component {
  handleClick(...args) {
    // Add click effect
    const buttonNode = findDOMNode(this);
    clearButton(buttonNode);
    setTimeout(() => buttonNode.className += ` ${prefix}clicked`, 10);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => clearButton(buttonNode), 500);

    this.props.onClick(...args);
  }
  // Handle auto focus when click button in Chrome
  handleMouseUp(e) {
    findDOMNode(this).blur();
    if (this.props.onMouseUp) {
      this.props.onMouseUp(e);
    }
  }
  render() {
    const props = this.props;
    const { type, shape, size, className, htmlType, children, ...others } = props;

    // large => lg
    // small => sm
    const sizeCls = ({
      large: 'lg',
      small: 'sm',
    })[size] || '';

    const classes = classNames({
      'ant-btn': true,
      [prefix + type]: type,
      [prefix + shape]: shape,
      [prefix + sizeCls]: sizeCls,
      [`${prefix}loading`]: ('loading' in props && props.loading !== false),
      [className]: className,
    });

    const kids = React.Children.map(children, insertSpace);

    return (
      <button {...others}
        type={htmlType || 'button'}
        className={classes}
        onMouseUp={this.handleMouseUp.bind(this)}
        onClick={this.handleClick.bind(this)}>
        {kids}
      </button>
    );
  }
}

Button.propTypes = {
  type: React.PropTypes.oneOf(['primary', 'ghost', 'dashed']),
  shape: React.PropTypes.oneOf(['circle', 'circle-outline']),
  size: React.PropTypes.oneOf(['large', 'default', 'small']),
  htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
  onClick: React.PropTypes.func,
  loading: React.PropTypes.bool,
  className: React.PropTypes.string,
};

Button.defaultProps = {
  onClick() {},
};
