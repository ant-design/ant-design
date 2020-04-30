import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Input, { InputProps } from './Input';

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action?: string;
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

export interface PasswordState {
  visible: boolean;
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

export default class Password extends React.Component<PasswordProps, PasswordState> {
  input: HTMLInputElement;

  static defaultProps = {
    action: 'click',
    visibilityToggle: true,
    iconRender: (visible: boolean) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />),
  };

  state: PasswordState = {
    visible: false,
  };

  onVisibleChange = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.setState(({ visible }) => ({ visible: !visible }));
  };

  getIcon = (prefixCls: string) => {
    const { action, iconRender = () => null } = this.props;
    const { visible } = this.state;
    const iconTrigger = ActionMap[action!] || '';
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: this.onVisibleChange,
      className: `${prefixCls}-icon`,
      key: 'passwordIcon',
      onMouseDown: (e: MouseEvent) => {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      },
      onMouseUp: (e: MouseEvent) => {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      },
    };
    return React.cloneElement(React.isValidElement(icon) ? icon : <span>{icon}</span>, iconProps);
  };

  saveInput = (instance: Input) => {
    if (instance && instance.input) {
      this.input = instance.input;
    }
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  renderPassword = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className,
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      visibilityToggle,
      ...restProps
    } = this.props;

    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
    const prefixCls = getPrefixCls('input-password', customizePrefixCls);

    const suffixIcon = visibilityToggle && this.getIcon(prefixCls);
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    });

    const props = {
      ...omit(restProps, ['suffix', 'iconRender']),
      type: this.state.visible ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon,
      ref: this.saveInput,
    };

    if (size) {
      props.size = size;
    }

    return <Input {...props} />;
  };

  render() {
    return <ConfigConsumer>{this.renderPassword}</ConfigConsumer>;
  }
}
