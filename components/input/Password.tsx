import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';

export interface PasswordProps extends InputProps {
  inputPrefixCls?: string;
  visibilityToggle?: boolean;
}

export interface PasswordState {
  visible: boolean;
}

export default class Password extends React.Component<PasswordProps, PasswordState> {
  static defaultProps = {
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

  renderPassword = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className,
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      suffix,
      visibilityToggle,
      ...restProps
    } = this.props;
    const prefixCls = getPrefixCls('input-password', customizePrefixCls);
    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    });
    let suffixIcon;

    if (visibilityToggle) {
      const iconProps = {
        onClick: this.onChange,
        className: `${prefixCls}-icon`,
        type: this.state.visible ? 'eye' : 'eye-invisible',
        key: 'passwordIcon',
        onMouseDown: (e: MouseEvent) => {
          // Prevent focused state lost
          // https://github.com/ant-design/ant-design/issues/15173
          e.preventDefault();
        },
      };
      suffixIcon = <Icon {...iconProps} />;
    }

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
  };

  render() {
    return <ConfigConsumer>{this.renderPassword}</ConfigConsumer>;
  }
}
