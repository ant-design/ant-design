import RcCheckbox from 'rc-checkbox';
import * as React from 'react';
import CheckboxGroup from './Group';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import splitObject from '../_util/splitObject';

export interface CheckboxProps {
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 初始是否选中 */
  defaultChecked?: boolean;
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
  };
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const [{ prefixCls, style, children, className }, restProps] = splitObject(
      this.props, ['prefixCls', 'style', 'children', 'className']
    );
    const classString = classNames({
      [className]: !!className,
      [`${prefixCls}-wrapper`]: true,
    });
    return (
      <label className={classString} style={style}>
        <RcCheckbox {...restProps} prefixCls={prefixCls} children={null} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
