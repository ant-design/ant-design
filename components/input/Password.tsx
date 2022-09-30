import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { useState } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer } from '../config-provider';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

const defaultIconRender = (visible: boolean) =>
  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />;

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action?: string;
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

const Password = React.forwardRef<InputRef, PasswordProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const onVisibleChange = () => {
    const { disabled } = props;
    if (disabled) {
      return;
    }
    setVisible(prevState => !prevState);
  };

  const getIcon = (prefixCls: string) => {
    const { action = 'click', iconRender = defaultIconRender } = props;
    const iconTrigger = ActionMap[action] || '';
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: onVisibleChange,
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

  const renderPassword = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className,
      prefixCls: customizePrefixCls,
      inputPrefixCls: customizeInputPrefixCls,
      size,
      visibilityToggle = true,
      ...restProps
    } = props;

    const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
    const prefixCls = getPrefixCls('input-password', customizePrefixCls);

    const suffixIcon = visibilityToggle && getIcon(prefixCls);
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-${size}`]: !!size,
    });

    const omittedProps: InputProps = {
      ...omit(restProps, ['suffix', 'iconRender']),
      type: visible ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon,
    };

    if (size) {
      omittedProps.size = size;
    }

    return <Input ref={ref} {...omittedProps} />;
  };

  return <ConfigConsumer>{renderPassword}</ConfigConsumer>;
});

if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Password';
}

export default Password;
