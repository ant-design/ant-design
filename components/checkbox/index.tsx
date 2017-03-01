import RcCheckbox from 'rc-checkbox';
import React from 'react';
import CheckboxGroup from './Group';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';

export interface CheckboxProps {
  prefixCls?: string;
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 初始是否选中 */
  defaultChecked?: boolean;
  /** indeterminate 状态，只负责样式控制 */
  indeterminate?: boolean;
  /** 变化时回调函数 */
  onChange?: React.FormEventHandler<any>;
  onMouseEnter?: React.MouseEventHandler<any>;
  onMouseLeave?: React.MouseEventHandler<any>;
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
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const {
      prefixCls, style, children, className, indeterminate,
      onMouseEnter, onMouseLeave, ...restProps,
     } = this.props;
    const classString = classNames(className, {
      [`${prefixCls}-wrapper`]: true,
    });
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
    });
    return (
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
