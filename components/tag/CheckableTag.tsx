import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
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
  /**
   * @since 5.29.0
   */
  size?: SizeType;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
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
    size: customizeSize,
    onChange,
    onClick,
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

  const prefixCls = getPrefixCls('tag', customizePrefixCls);

  // Size
  const sizeClassNameMap: Record<NonNullable<SizeType>, string | undefined> = {
    large: 'lg',
    small: 'sm',
    middle: undefined, // default size
  };

  const sizeFullName = useSize((ctxSize) => customizeSize ?? ctxSize ?? 'middle');

  const sizeCls = sizeClassNameMap[sizeFullName];

  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-checkable`,
    {
      [`${prefixCls}-checkable-checked`]: checked,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
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
      style={{ ...style, ...tag?.style }}
      className={cls}
      onClick={handleClick}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
});

export default CheckableTag;
