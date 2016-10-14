import RcCheckbox from 'rc-checkbox';
import React from 'react';
import CheckboxGroup from './Group';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
import shallowCompare from '../_util/shallowCompare';

export interface CheckboxProps {
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
  /** 变化时回调函数 */
  onChange?: React.FormEventHandler;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static Group = CheckboxGroup;
  static defaultProps = {
    prefixCls: 'ant-checkbox',
    indeterminate: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const [{ prefixCls, style, children, className, indeterminate }, restProps] = splitObject(
      this.props, ['prefixCls', 'style', 'children', 'className', 'indeterminate']
    );
    const classString = classNames({
      [className]: !!className,
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label className={classString} style={style}>
        <RcCheckbox
          {...restProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          children={null}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
