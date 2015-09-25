import React from 'react';

export default class Button extends React.Component {
  render() {
    const props = this.props;
    const {type, shape, size, onClick, className, ...others} = props;
    const prefix = ' ant-btn-';

    let classSet = 'ant-btn';
    if (type) {
      classSet += prefix + type;
    }
    if (shape) {
      classSet += prefix + shape;
    }
    if (size) {
      classSet += prefix + size;
    }
    if ('loading' in props && props.loading !== false) {
      classSet += prefix + 'loading';
    }
    if (className) {
      classSet += ' ' + className;
    }

    return <button {...others} type="button" className={classSet} onClick={onClick} />;
  }
}
Button.defaultProps = {
  onClick() {},
};
