import * as React from 'react';
import { useRef, useState } from 'react';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import { useLocale } from '../locale';
import useRemovePasswordTimeout from './hooks/useRemovePasswordTimeout';
import type { InputProps, InputRef } from './Input';
import Input from './Input';

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
  /**
   * @since 5.27.0
   */
  suffix?: React.ReactNode;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const actionMap: Record<PropertyKey, keyof React.DOMAttributes<HTMLSpanElement>> = {
  click: 'onClick',
  hover: 'onMouseOver',
};

const Password = React.forwardRef<InputRef, PasswordProps>((props, ref) => {
  const {
    disabled: customDisabled,
    action = 'click',
    visibilityToggle = true,
    iconRender,
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    suffix,
    className,
    style,
    classNames,
    styles,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    iconRender: contextIconRender,
  } = useComponentConfig('inputPassword');

  const [locale] = useLocale('global');

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  // =========== Merged Props for Semantic ==========
  const mergedProps: PasswordProps = {
    ...props,
    disabled: mergedDisabled,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    { props: mergedProps },
  );

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

    const nextVisible = !visible;
    setVisible(nextVisible);

    if (typeof visibilityToggle === 'object') {
      visibilityToggle.onVisibleChange?.(nextVisible);
    }
  };

  const getIcon = (prefixCls: string) => {
    const iconTrigger = actionMap[action] || '';
    const iconRenderer = iconRender || contextIconRender || defaultIconRender;
    const icon = iconRenderer(visible);

    return (
      <span
        key="passwordIcon"
        role="button"
        tabIndex={mergedDisabled ? -1 : 0}
        className={`${prefixCls}-icon`}
        aria-disabled={mergedDisabled}
        aria-pressed={visible}
        aria-label={visible ? locale.hide : locale.show}
        onMouseDown={(e) => {
          // Prevent focused state lost
          // https://github.com/ant-design/ant-design/issues/15173
          e.preventDefault();
        }}
        onMouseUp={(e) => {
          // Prevent caret position change
          // https://github.com/ant-design/ant-design/issues/23524
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onVisibleChange();
          }
        }}
        {...{ [iconTrigger]: onVisibleChange }}
      >
        {icon}
      </span>
    );
  };

  const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
  const prefixCls = getPrefixCls('input-password', customizePrefixCls);

  const suffixIcon = visibilityToggle && getIcon(prefixCls);

  const inputClassName = clsx(prefixCls, contextClassName, className, {
    [`${prefixCls}-${props.size}`]: !!props.size,
  });

  const inputProps: InputProps = {
    ...restProps,
    type: visible ? 'text' : 'password',
    prefixCls: inputPrefixCls,
    suffix: (
      <>
        {suffixIcon}
        {suffix}
      </>
    ),
    disabled: mergedDisabled,
    className: inputClassName,
    style: { ...contextStyle, ...style },
    classNames: mergedClassNames,
    styles: mergedStyles,
  };

  return <Input ref={composeRef(ref, inputRef)} {...inputProps} />;
});

if (process.env.NODE_ENV !== 'production') {
  Password.displayName = 'Input.Password';
}

export default Password;
