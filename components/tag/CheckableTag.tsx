import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useStyle from './style';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * It is an absolute controlled component and has no uncontrolled mode.
   *
   * zh-cn 该组件为完全受控组件，不支持非受控用法。
   */
  checked: boolean;
  children?: React.ReactNode;
  /**
   * @since 5.27.0
   */
  icon?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLSpanElement>;
  disabled?: boolean;
}

const CheckableTag = React.forwardRef<HTMLSpanElement, CheckableTagProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    checked,
    children,
    icon,
    onChange,
    onClick,
    onKeyDown,
    disabled: customDisabled,
    ...restProps
  } = props;
  const { getPrefixCls, tag } = React.useContext(ConfigContext);

  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (mergedDisabled) {
      return;
    }
    onChange?.(!checked);
    onClick?.(e);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    onKeyDown?.(e);

    if (e.defaultPrevented || mergedDisabled) {
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const prefixCls = getPrefixCls('tag', customizePrefixCls);

  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-checkable`,
    {
      [`${prefixCls}-checkable-checked`]: checked,
      [`${prefixCls}-checkable-disabled`]: mergedDisabled,
    },
    tag?.className,
    className,
    hashId,
    cssVarCls,
  );

  return (
    <span
      {...restProps}
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={mergedDisabled || undefined}
      tabIndex={mergedDisabled ? -1 : 0}
      style={{ ...style, ...tag?.style }}
      className={cls}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
});

export default CheckableTag;
