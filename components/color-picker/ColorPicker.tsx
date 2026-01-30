import React, { useContext, useMemo } from 'react';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import ContextIsolator from '../_util/ContextIsolator';
import { useMergeSemantic } from '../_util/hooks';
import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import { useCompactItemContext } from '../space/Compact';
import useMergedArrow from '../tooltip/hook/useMergedArrow';
import { AggregationColor } from './color';
import type { ColorPickerPanelProps } from './ColorPickerPanel';
import ColorPickerPanel from './ColorPickerPanel';
import ColorTrigger from './components/ColorTrigger';
import useModeColor from './hooks/useModeColor';
import type { ColorFormatType, ColorPickerProps, ModeType, TriggerPlacement } from './interface';
import useStyle from './style';
import { genAlphaColor, generateColor, getColorAlpha } from './util';

type CompoundedComponent = React.FC<ColorPickerProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const ColorPicker: CompoundedComponent = (props) => {
  const {
    mode,
    value,
    defaultValue,
    format,
    defaultFormat,
    allowClear = false,
    presets,
    children,
    trigger = 'click',
    open,
    disabled,
    placement = 'bottomLeft',
    arrow,
    panelRender,
    showText,
    style,
    className,
    size: customizeSize,
    rootClassName,
    prefixCls: customizePrefixCls,
    styles,
    classNames,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide,
    destroyOnHidden,
    disabledFormat,
    ...rest
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    arrow: contextArrow,
  } = useComponentConfig('colorPicker');

  const contextDisabled = useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);
  const mergedArrow = useMergedArrow(arrow, contextArrow);

  // ================== Size ==================
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // =========== Merged Props for Semantic ===========
  const mergedProps: ColorPickerProps = {
    ...props,
    trigger,
    allowClear,
    autoAdjustOverflow,
    disabledAlpha,
    arrow: mergedArrow,
    placement,
    disabled: mergedDisabled,
    size: mergedSize,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
    {
      popup: {
        _default: 'root',
      },
    },
  );

  const [internalPopupOpen, setPopupOpen] = useControlledState(false, open);

  const popupOpen = !mergedDisabled && internalPopupOpen;
  const [formatValue, setFormatValue] = useControlledState(defaultFormat, format);

  const triggerFormatChange = (newFormat?: ColorFormatType) => {
    setFormatValue(newFormat);
    if (formatValue !== newFormat) {
      onFormatChange?.(newFormat);
    }
  };

  const triggerOpenChange = (visible: boolean) => {
    if (!visible || !mergedDisabled) {
      setPopupOpen(visible);
      onOpenChange?.(visible);
    }
  };

  // ================== Value & Mode =================
  const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(
    defaultValue,
    value,
    mode,
  );

  const isAlphaColor = useMemo(() => getColorAlpha(mergedColor) < 100, [mergedColor]);

  // ==================== Change =====================
  // To enhance user experience, we cache the gradient color when switch from gradient to single
  // If user not modify single color, we will use the cached gradient color.
  const [cachedGradientColor, setCachedGradientColor] = React.useState<AggregationColor | null>(
    null,
  );

  const onInternalChangeComplete: ColorPickerProps['onChangeComplete'] = (color) => {
    if (onChangeComplete) {
      let changeColor = generateColor(color);

      // ignore alpha color
      if (disabledAlpha && isAlphaColor) {
        changeColor = genAlphaColor(color);
      }
      onChangeComplete(changeColor);
    }
  };

  const onInternalChange: ColorPickerPanelProps['onChange'] = (data, changeFromPickerDrag) => {
    let color: AggregationColor = generateColor(data as AggregationColor);

    // ignore alpha color
    if (disabledAlpha && isAlphaColor) {
      color = genAlphaColor(color);
    }

    setColor(color);
    setCachedGradientColor(null);

    // Trigger change event
    if (onChange) {
      onChange(color, color.toCssString());
    }

    // Only for drag-and-drop color picking
    if (!changeFromPickerDrag) {
      onInternalChangeComplete(color);
    }
  };

  // =================== Gradient ====================
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [gradientDragging, setGradientDragging] = React.useState(false);

  // Mode change should also trigger color change
  const onInternalModeChange = (newMode: ModeType) => {
    setModeState(newMode);

    if (newMode === 'single' && mergedColor.isGradient()) {
      setActiveIndex(0);
      onInternalChange(new AggregationColor(mergedColor.getColors()[0].color));

      // Should after `onInternalChange` since it will clear the cached color
      setCachedGradientColor(mergedColor);
    } else if (newMode === 'gradient' && !mergedColor.isGradient()) {
      const baseColor = isAlphaColor ? genAlphaColor(mergedColor) : mergedColor;

      onInternalChange(
        new AggregationColor(
          cachedGradientColor || [
            {
              percent: 0,
              color: baseColor,
            },
            {
              percent: 100,
              color: baseColor,
            },
          ],
        ),
      );
    }
  };

  // ================== Form Status ==================
  const { status: contextStatus } = React.useContext(FormItemInputContext);

  // ===================== Style =====================

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const rtlCls = { [`${prefixCls}-rtl`]: direction };
  const mergedRootCls = clsx(rootClassName, cssVarCls, rootCls, rtlCls);
  const mergedCls = clsx(
    getStatusClassNames(prefixCls, contextStatus),
    {
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
    },
    compactItemClassnames,
    contextClassName,
    mergedRootCls,
    className,
    hashId,
  );
  const mergedPopupCls = clsx(prefixCls, mergedRootCls, mergedClassNames.popup?.root);

  // ===================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('ColorPicker');

    warning(
      !(disabledAlpha && isAlphaColor),
      'usage',
      '`disabledAlpha` will make the alpha to be 100% when use alpha color.',
    );
  }

  const popoverProps: PopoverProps = {
    open: popupOpen,
    trigger,
    placement,
    arrow: mergedArrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
    destroyOnHidden: destroyOnHidden ?? !!destroyTooltipOnHide,
  };

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  // ============================ zIndex ============================

  return (
    <Popover
      classNames={{ root: mergedPopupCls }}
      styles={{ root: mergedStyles.popup?.root, container: styles?.popupOverlayInner }}
      onOpenChange={triggerOpenChange}
      content={
        <ContextIsolator form>
          <ColorPickerPanel
            mode={modeState}
            onModeChange={onInternalModeChange}
            modeOptions={modeOptions}
            prefixCls={prefixCls}
            value={mergedColor}
            allowClear={allowClear}
            disabled={mergedDisabled}
            disabledAlpha={disabledAlpha}
            presets={presets}
            panelRender={panelRender}
            format={formatValue}
            onFormatChange={triggerFormatChange}
            onChange={onInternalChange}
            onChangeComplete={onInternalChangeComplete}
            onClear={onClear}
            activeIndex={activeIndex}
            onActive={setActiveIndex}
            gradientDragging={gradientDragging}
            onGradientDragging={setGradientDragging}
            disabledFormat={disabledFormat}
          />
        </ContextIsolator>
      }
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          activeIndex={popupOpen ? activeIndex : -1}
          open={popupOpen}
          className={mergedCls}
          style={mergedStyle}
          classNames={mergedClassNames}
          styles={mergedStyles}
          prefixCls={prefixCls}
          disabled={mergedDisabled}
          showText={showText}
          format={formatValue}
          {...rest}
          color={mergedColor}
        />
      )}
    </Popover>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPicker.displayName = 'ColorPicker';
}

const PurePanel = genPurePanel(
  ColorPicker,
  undefined,
  (props: ColorPickerProps) => ({
    ...props,
    placement: 'bottom' as TriggerPlacement,
    autoAdjustOverflow: false,
  }),
  'color-picker',
  /* istanbul ignore next */
  (prefixCls) => prefixCls,
);

ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default ColorPicker;
