import React from 'react';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2,2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
  return typeof str === 'string';
}

const prefix = 'ant-btn-';
function updateClassWithProp(classSet, prop) {
  if (prop) {
    classSet.push(prefix + prop);
  }
}

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
    const {type, shape, size, onClick, className, children, ...others} = props;

    let classSet = ['ant-btn'];
    updateClassWithProp(classSet, type);
    updateClassWithProp(classSet, shape);
    updateClassWithProp(classSet, size);
    if ('loading' in props && props.loading !== false) {
      classSet.push(prefix + 'loading');
    }
    if (className) {
      classSet.push(className);
    }

    const kids = React.Children.map(children, insertSpace);

    return <button {...others} type="button" className={classSet.join(' ')} onClick={onClick}>
      {kids}
    </button>;
  }
}
Button.defaultProps = {
  onClick() {},
};
