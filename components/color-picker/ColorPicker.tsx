import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import ContextIsolator from '../_util/ContextIsolator';
import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import { useCompactItemContext } from '../space/Compact';
import { AggregationColor } from './color';
import type { ColorPickerPanelProps } from './ColorPickerPanel';
import ColorPickerPanel from './ColorPickerPanel';
import ColorTrigger from './components/ColorTrigger';
import useModeColor from './hooks/useModeColor';
import type { ColorPickerProps, ModeType, TriggerPlacement } from './interface';
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
    arrow = true,
    panelRender,
    showText,
    style,
    className,
    size: customizeSize,
    rootClassName,
    prefixCls: customizePrefixCls,
    styles,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide,
    disabledFormat,
    ...rest
  } = props;

  const { getPrefixCls, direction, colorPicker } = useContext<ConfigConsumerProps>(ConfigContext);
  const contextDisabled = useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;

  const [popupOpen, setPopupOpen] = useMergedState(false, {
    value: open,
    postState: (openData) => !mergedDisabled && openData,
    onChange: onOpenChange,
  });
  const [formatValue, setFormatValue] = useMergedState(format, {
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange,
  });

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

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

  // ==================== Compact ====================
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  // ===================== Style =====================
  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const rtlCls = { [`${prefixCls}-rtl`]: direction };
  const mergedRootCls = classNames(rootClassName, cssVarCls, rootCls, rtlCls);
  const mergedCls = classNames(
    getStatusClassNames(prefixCls, contextStatus),
    {
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
    },
    compactItemClassnames,
    colorPicker?.className,
    mergedRootCls,
    className,
    hashId,
  );
  const mergedPopupCls = classNames(prefixCls, mergedRootCls);

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
    arrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
    destroyTooltipOnHide,
  };

  const mergedStyle: React.CSSProperties = { ...colorPicker?.style, ...style };

  // ============================ zIndex ============================

  return wrapCSSVar(
    <Popover
      style={styles?.popup}
      styles={{ body: styles?.popupOverlayInner }}
      onOpenChange={(visible) => {
        if (!visible || !mergedDisabled) {
          setPopupOpen(visible);
        }
      }}
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
            onFormatChange={setFormatValue}
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
      classNames={{ root: mergedPopupCls }}
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          activeIndex={popupOpen ? activeIndex : -1}
          open={popupOpen}
          className={mergedCls}
          style={mergedStyle}
          prefixCls={prefixCls}
          disabled={mergedDisabled}
          showText={showText}
          format={formatValue}
          {...rest}
          color={mergedColor}
        />
      )}
    </Popover>,
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
