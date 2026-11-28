import * as React from 'react';
import { clsx } from 'clsx';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';
import useColor from './hooks/useColor';

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
   * Color of the Tag. Same preset / status / custom colors as `Tag` `color`.
   * Only takes effect when `checked` is `true` and the tag is not disabled.
   */
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
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
    color,
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

  // ====================== Colors ======================
  // Reuse Tag's color resolution. Checked state renders as `solid`,
  // so preset / status colors pick up the `.ant-tag-{color}.ant-tag-solid`
  // styles and custom colors get an inline background.
  const [, mergedColor, isPreset, isStatus, customTagStyle] = useColor({
    color,
    variant: 'solid',
  });
  const isInternalColor = isPreset || isStatus;
  // Color only shows on a checked, enabled tag: unchecked stays transparent
  // and disabled keeps its existing disabled look.
  const showColor = color !== undefined && checked && !mergedDisabled;

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
      [`${prefixCls}-solid`]: showColor && isInternalColor,
      [`${prefixCls}-${mergedColor}`]: showColor && isInternalColor,
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
      style={{ ...tag?.style, ...(showColor ? customTagStyle : {}), ...style }}
      className={cls}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {icon}
      <span>{children}</span>
      {showColor && isPreset && <PresetCmp key="preset" prefixCls={prefixCls} />}
      {showColor && isStatus && <StatusCmp key="status" prefixCls={prefixCls} />}
    </span>
  );
});

export default CheckableTag;
