import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action: string;
}

export interface PasswordState {
  visible: boolean,
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
}

export default class Password extends React.Component<PasswordProps, PasswordState> {
  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-password',
    action: 'click',
  };

  state: PasswordState = {
    visible: false,
  };

  private input: Input;

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node: Input) => {
    this.input = node;
  }

  onChange = () => {
    this.input.blur();

    this.setState({
      visible: !this.state.visible,
    });
  }

  getIcon() {
    const { prefixCls, action } = this.props;
    const iconTrigger = ActionMap[action] || '';
    const iconProps = {
      [iconTrigger]: this.onChange,
    };

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
    const { className, prefixCls, inputPrefixCls, size, suffix, ...restProps } = this.props;
    const suffixIcon = this.getIcon();
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
        ref={this.saveInput}
      />
    );
  }
}
