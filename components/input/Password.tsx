import * as React from 'react';
import { useRef, useState } from 'react';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import { composeRef } from 'rc-util/lib/ref';

import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import type { InputProps, InputRef } from './Input';
import Input from './Input';
import DisabledContext from '../config-provider/DisabledContext';

const defaultIconRender = (visible: boolean): React.ReactNode =>
  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />;

interface VisibilityToggle {
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
}

export interface PasswordProps extends InputProps {
  readonly inputPrefixCls?: string;
  readonly action?: 'click' | 'hover';
  visibilityToggle?: boolean | VisibilityToggle;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const actionMap: Record<PropertyKey, keyof React.DOMAttributes<HTMLSpanElement>> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

type IconPropsType = React.HTMLAttributes<HTMLSpanElement> & React.Attributes;

const Password = React.forwardRef<InputRef, PasswordProps>((props, ref) => {
  const {
    disabled: customDisabled,
    action = 'click',
    visibilityToggle = true,
    iconRender = defaultIconRender,
  } = props;

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const visibilityControlled =
    typeof visibilityToggle === 'object' && visibilityToggle.visible !== undefined;
  const [visible, setVisible] = useState(() =>
    visibilityControlled ? visibilityToggle.visible! : false,
  );
  const inputRef = useRef<InputRef>(null);

  React.useEffect(() => {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible!);
    }
  }, [visibilityControlled, visibilityToggle]);

  // Remove Password value
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef);

  const onVisibleChange = () => {
    if (mergedDisabled) {
      return;
    }
    if (visible) {
      removePasswordTimeout();
    }
    setVisible((prevState) => {
      const newState = !prevState;
      if (typeof visibilityToggle === 'object') {
        visibilityToggle.onVisibleChange?.(newState);
      }
      return newState;
    });
  };

  const getIcon = (prefixCls: string) => {
    const iconTrigger = actionMap[action] || '';
    const icon = iconRender(visible);
    const iconProps: IconPropsType = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls}-icon`,
      key: 'passwordIcon',
      onMouseDown: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        // Prevent focused state lost
        // https://github.com/ant-design/ant-design/issues/15173
        e.preventDefault();
      },
      onMouseUp: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        // Prevent caret position change
        // https://github.com/ant-design/ant-design/issues/23524
        e.preventDefault();
      },
    };
    return React.cloneElement<IconPropsType>(
      React.isValidElement<IconPropsType>(icon) ? icon : <span>{icon}</span>,
      iconProps,
    );
  };

  const {
    className,
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    size,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext<ConfigConsumerProps>(ConfigContext);
  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const prefixCls = getPrefixCls('input-password', customizePrefixCls);

  const suffixIcon = visibilityToggle && getIcon(prefixCls);

  const inputClassName = classNames(prefixCls, className, {
    [`${prefixCls}-${size}`]: !!size,
  });

  const omittedProps: InputProps = {
    ...omit(restProps, ['suffix', 'iconRender', 'visibilityToggle']),
    type: visible ? 'text' : 'password',
    className: inputClassName,
    prefixCls: inputPrefixCls,
    suffix: suffixIcon,
  };

  if (size) {
    omittedProps.size = size;
  }

  return <Input ref={composeRef(ref, inputRef)} {...omittedProps} />;
});

if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Input.Password';
}

export default Password;
