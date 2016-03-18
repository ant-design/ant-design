import RcCheckbox from 'rc-checkbox';
import React from 'react';
import Group from './Group';
import classNames from 'classnames';

export default class Checkbox extends React.Component {
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
}

Checkbox.defaultProps = {
  prefixCls: 'ant-checkbox'
};

Checkbox.Group = Group;
