import RcRadio from 'rc-radio';
import React from 'react';
import classNames from 'classnames';
import shallowCompare from '../_util/shallowCompare';

export interface RadioProps {
  /** 指定当前是否选中*/
  checked?: boolean;
  /** 初始是否选中*/
  defaultChecked?: boolean;
  /** 根据 value 进行比较，判断是否选中  */
  value?: string | number;
  style?: React.CSSProperties;
  prefixCls?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: any) => any;
}

export default class Radio extends React.Component<RadioProps, any> {
  static Group: any;
  static Button: any;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  render() {
    const { prefixCls, children, checked, disabled, className, style } = this.props;
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checked,
      [`${prefixCls}-wrapper-disabled`]: disabled,
      [className]: !!className,
    });
    const classString = classNames({
      [`${prefixCls}`]: true,
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    });
    return (
      <label className={wrapperClassString} style={style}>
        <RcRadio {...this.props} className={classString} style={null} children={null} />
        {children ? <span>{children}</span> : null}
      </label>
    );
  }
}
