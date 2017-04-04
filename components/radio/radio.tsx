import RcRadio from 'rc-radio';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

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
  static Group: any;
  static Button: any;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  }

  render() {
    const { prefixCls, className, children, style, ...restProps } = this.props;
    let radioProps: RadioProps = { ...restProps };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    }, className);

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <RcRadio
          {...radioProps}
          prefixCls={prefixCls}
        />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
