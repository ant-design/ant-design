import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import { composeRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { useRef, useState } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer } from '../config-provider';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

const defaultIconRender = (visible: boolean) =>
  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />;

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const ActionMap: Record<string, string> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

const Password = React.forwardRef<InputRef, PasswordProps>((props, ref) => {
  const [visibleState, setVisibleState] = useState(props.visible ?? false);
  const inputRef = useRef<InputRef>(null);

  React.useEffect(() => {
    if (props.visible !== undefined) {
      setVisibleState(props.visible);
    }
  }, [props.visible]);

  // Remove Password value
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef);

  const onVisibleChange = () => {
    const { disabled } = props;
    if (disabled) {
      return;
    }
    if (visibleState) {
      removePasswordTimeout();
    }
    setVisibleState(prevState => {
      const newState = !prevState;
      props.onVisibleChange?.(newState);
      return newState;
    });
  };

  const getIcon = (prefixCls: string) => {
    const { action = 'click', iconRender = defaultIconRender } = props;
    const iconTrigger = ActionMap[action] || '';
    const icon = iconRender(visibleState);
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
      type: visibleState ? 'text' : 'password',
      className: inputClassName,
      prefixCls: inputPrefixCls,
      suffix: suffixIcon,
    };

    if (size) {
      omittedProps.size = size;
    }

    return <Input ref={composeRef(ref, inputRef)} {...omittedProps} />;
  };

  return <ConfigConsumer>{renderPassword}</ConfigConsumer>;
});

if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Password';
}

export default Password;
