import RcRadio from 'rc-radio';
import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';

export interface RadioProps {
  /** 指定当前是否选中*/
  checked?: boolean;
  /** 初始是否选中*/
  defaultChecked?: boolean;
  /** 根据 value 进行比较，判断是否选中  */
  value?: any;
  style?: React.CSSProperties;
  prefixCls?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (e: any) => any;
  onMouseEnter?: React.FormEventHandler<any>;
  onMouseLeave?: React.FormEventHandler<any>;
}

export default class Radio extends React.Component<RadioProps, any> {
  static __ANT_RADIO = true;

  static Group: any;
  static Button: any;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const { prefixCls, className, children, style, ...restProps } = this.props;
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: restProps.checked,
      [`${prefixCls}-wrapper-disabled`]: restProps.disabled,
    }, className);

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <RcRadio {...restProps} prefixCls={prefixCls} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
