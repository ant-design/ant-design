import * as React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * It is an absolute controlled component and has no uncontrolled mode.
   *
   * .zh-cn 该组件为完全受控组件，不支持非受控用法。
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
    ...restProps
  } = props;
  const { getPrefixCls, tag } = React.useContext(ConfigContext);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onChange?.(!checked);
    onClick?.(e);
  };

  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  // Size
  const sizeClassNameMap: Record<NonNullable<SizeType>, string | undefined> = {
    large: 'lg',
    small: 'sm',
    middle: undefined, // default size
  };

  const sizeFullName = useSize((ctxSize) => customizeSize ?? ctxSize ?? 'middle');

  const sizeCls = sizeClassNameMap[sizeFullName];

  const cls = classNames(
    prefixCls,
    `${prefixCls}-checkable`,
    {
      [`${prefixCls}-checkable-checked`]: checked,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
    },
    tag?.className,
    className,
    hashId,
    cssVarCls,
  );

  return wrapCSSVar(
    <span
      {...restProps}
      ref={ref}
      style={{ ...style, ...tag?.style }}
      className={cls}
      onClick={handleClick}
    >
      {icon}
      <span>{children}</span>
    </span>,
  );
});

export default CheckableTag;
