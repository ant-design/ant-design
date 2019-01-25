import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action: string;
  visibilityToggle?: boolean;
}

export interface PasswordState {
  visible: boolean;
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

export default class Password extends React.Component<PasswordProps, PasswordState> {
  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-password',
    action: 'click',
    visibilityToggle: true,
  };

  state: PasswordState = {
    visible: false,
  };

  onChange = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  getIcon() {
    const { prefixCls, action } = this.props;
    const iconTrigger = ActionMap[action] || '';
    const iconProps = { [iconTrigger]: this.onChange };
    return React.cloneElement(
      <Icon
        {...iconProps}
        className={`${prefixCls}-icon`}
        type={this.state.visible ? 'eye-invisible' : 'eye'}
        key="passwordIcon"
      />,
    );
  }

  render() {
    const {
      className,
      prefixCls,
      inputPrefixCls,
      size,
      suffix,
      visibilityToggle,
      ...restProps
    } = this.props;
    const suffixIcon = visibilityToggle && this.getIcon();
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        {...restProps}
        type={this.state.visible ? 'text' : 'password'}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={suffixIcon}
      />
    );
  }
}
