import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';
import { clsx } from 'clsx';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { isPresetColor, isPresetStatusColor } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';

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
  /**
   * @since 6.8.0
   */
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
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
    color,
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

  // ===================== Colors =====================
  const nextColor = color?.endsWith('-inverse') ? color.replace('-inverse', '') : color;
  const isPreset = isPresetColor(nextColor);
  const isStatus = isPresetStatusColor(nextColor);
  const isInternalColor = isPreset || isStatus;

  // Custom colors are applied inline since they cannot be covered by the
  // preset styles: a light tint while unchecked, the solid color once checked.
  // Preset and status colors are handled by the preset/status style sheets.
  const customColorStyle = React.useMemo<React.CSSProperties>(() => {
    if (!nextColor || isInternalColor || mergedDisabled) {
      return {};
    }

    if (checked) {
      return {
        backgroundColor: nextColor,
        borderColor: nextColor,
      };
    }

    const hsl = new FastColor(nextColor).toHsl();
    hsl.l = 0.95;

    return {
      backgroundColor: new FastColor(hsl).toHexString(),
      color: nextColor,
    };
  }, [nextColor, isInternalColor, mergedDisabled, checked]);

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
      if (!e.repeat) {
        onChange?.(!checked);
      }
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
      [`${prefixCls}-${nextColor}`]: isInternalColor,
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
      style={{ ...tag?.style, ...customColorStyle, ...style }}
      className={cls}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon}
      <span>{children}</span>
      {isPreset && <PresetCmp key="preset" prefixCls={prefixCls} />}
      {isStatus && <StatusCmp key="status" prefixCls={prefixCls} />}
    </span>
  );
});

export default CheckableTag;
