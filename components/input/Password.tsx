import * as React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';

export interface PasswordProps extends InputProps {
  inputPrefixCls?: string;
  action?: string;
}

export interface PreviewState {
  theme: any,
  type: string,
}

export default class Password extends React.Component<PasswordProps, any> {
  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-password',
    action: 'click',
  };

  state: PreviewState = {
    theme: undefined,
    type: "text",
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
    const { theme } = this.state;

    this.input.blur();

    if(theme === 'filled') {
      this.setState({
        theme: undefined,
        type: "text",
      })
    } else {
      this.setState({
        theme: "filled",
        type: "password",
      })
    }
  }

  getTrigger = () => {
    const { action } = this.props;
    let trigger;

    switch(action) {
      case 'click':
        trigger = 'onClick';
      break;

      case 'hover':
        trigger = 'onMouseOver';
      break;

      default:
        trigger = '';
      break;
    }

    return trigger;
  }

  getIcon() {
    const { prefixCls } = this.props;

    const iconTrigger = this.getTrigger();
    const iconProps = Object.assign(
      {},
      {
        className: `${prefixCls}-icon`,
        type: "eye",
        key: "passwordIcon",
        [iconTrigger]: this.onChange,
      },
    )

    return React.cloneElement(<Icon {...iconProps} />);
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
        type={this.state.type}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={suffixIcon}
        ref={this.saveInput}
      />
    );
  }
}
