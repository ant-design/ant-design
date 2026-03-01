import * as React from 'react';
import { clsx } from 'clsx';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import { useComponentConfig } from '../config-provider/context';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useColor from './hooks/useColor';
import useStyle from './style';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Preset color support for CheckableTag (e.g. 'red', 'green-inverse'). */
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
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
  disabled?: boolean;
}

const CheckableTag = React.forwardRef<HTMLSpanElement, CheckableTagProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    className,
    color,
    checked,
    children,
    icon,
    onChange,
    onClick,
    disabled: customDisabled,
    ...restProps
  } = props;
  const { getPrefixCls, tag } = React.useContext(ConfigContext);
  const { variant: contextVariant, style: contextStyle } = useComponentConfig('tag');

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

  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ====================== Colors ======================
  const [, mergedColor, isPreset, isStatus, customTagStyle] = useColor(
    // useColor expects TagProps-like shape; we only care about color + context variant
    { ...props, color, variant: contextVariant } as any,
    contextVariant,
  );
  const isInternalColor = isPreset || isStatus;

  const cls = clsx(
    prefixCls,
    `${prefixCls}-checkable`,
    {
      [`${prefixCls}-${mergedColor}`]: isInternalColor,
      [`${prefixCls}-checkable-checked`]: checked,
      [`${prefixCls}-checkable-disabled`]: mergedDisabled,
    },
    tag?.className,
    className,
    hashId,
    cssVarCls,
  );

  const mergedStyle = React.useMemo(() => {
    let next: React.CSSProperties = { ...contextStyle, ...style, ...tag?.style };
    if (!mergedDisabled) {
      next = { ...customTagStyle, ...next };
    }
    return next;
  }, [contextStyle, style, tag?.style, customTagStyle, mergedDisabled]);

  return (
    <span
      {...restProps}
      ref={ref}
      style={mergedStyle}
      className={cls}
      onClick={handleClick}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
});

export default CheckableTag;
