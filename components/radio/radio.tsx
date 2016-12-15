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
  static Group: any;
  static Button: any;

  static defaultProps = {
    prefixCls: 'ant-radio',
  };
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }
  render() {
    const { prefixCls, children, checked, disabled, className = '', style } = this.props;
    const wrapperClassString = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-checked`]: checked,
      [`${prefixCls}-wrapper-disabled`]: disabled,
    }, className);
    const classString = classNames(prefixCls, {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    });

    return (
      <label
        className={wrapperClassString}
        style={style}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <RcRadio {...this.props} className={classString} style={null} children={null} />
        {children ? <span>{children}</span> : null}
      </label>
    );
  }
}
