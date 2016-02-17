import RcCheckbox from 'rc-checkbox';
import React from 'react';
import Group from './Group';
import classNames from 'classnames';

const Checkbox = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-checkbox'
    };
  },
  render() {
    const { prefixCls, style, children, className, ...restProps } = this.props;
    const classString = classNames({
      [className]: !!className,
      [`${prefixCls}-wrapper`]: true,
    });
    return (
      <label className={classString} style={style}>
        <RcCheckbox {...restProps} prefixCls={prefixCls} children={null} />
        {children}
      </label>
    );
  }
});

Checkbox.Group = Group;

export default Checkbox;
