import React, { useContext } from 'react';
import { clsx } from 'clsx';

import ContextIsolator from '../_util/ContextIsolator';
import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import { isFunction } from '../_util/is';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import Divider from '../divider';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerContext, PanelPresetsContext } from './context';
import type { PanelPickerContextProps, PanelPresetsContextProps } from './context';
import useColorPickerPanelState from './hooks/useColorPickerPanelState';
import type { ColorPickerPanelState } from './hooks/useColorPickerPanelState';
import type { ColorPickerProps, ColorPickerSemanticAllType } from './interface';
import useStyle from './style';

export interface ColorPickerPanelProps
  extends Omit<
    ColorPickerProps,
    | 'arrow'
    | 'autoAdjustOverflow'
    | 'children'
    | 'destroyOnHidden'
    | 'destroyTooltipOnHide'
    | 'getPopupContainer'
    | 'onOpenChange'
    | 'open'
    | 'placement'
    | 'showText'
    | 'size'
    | 'trigger'
  > {}

type InternalColorPickerPanelProps = ColorPickerPanelProps & {
  _internalPanelState?: ColorPickerPanelState;
};

const ColorPickerPanel: React.FC<InternalColorPickerPanelProps> = (props) => {
  const {
    mode,
    value,
    defaultValue,
    format,
    defaultFormat,
    allowClear = false,
    presets,
    disabled,
    panelRender,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    classNames,
    styles,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onClear,
    onChangeComplete,
    disabledFormat,
    _internalPanelState,
    ...rest
  } = props;

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('colorPicker');

  const contextDisabled = useContext(DisabledContext);
  const mergedDisabled = disabled ?? contextDisabled;
  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

  const fallbackPanelState = useColorPickerPanelState(
    {
      mode,
      value,
      defaultValue,
      format,
      defaultFormat,
      disabledAlpha,
      onFormatChange,
      onChange,
      onChangeComplete,
    },
    _internalPanelState ? 'ColorPicker' : 'ColorPicker.Panel',
    !!_internalPanelState,
  );

  const panelState = _internalPanelState ?? fallbackPanelState;

  const mergedProps: ColorPickerProps = {
    ...rest,
    mode,
    value,
    defaultValue,
    format,
    defaultFormat,
    allowClear,
    presets,
    panelRender,
    rootClassName,
    prefixCls: customizePrefixCls,
    classNames,
    styles,
    onFormatChange,
    onChange,
    onClear,
    onChangeComplete,
    disabledFormat,
    disabled: mergedDisabled,
    disabledAlpha,
    style,
    className,
  };

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ColorPickerSemanticAllType['classNames'],
    ColorPickerSemanticAllType['styles'],
    ColorPickerProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles, styleRoot], {
    props: mergedProps,
  });

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const rtlCls = { [`${prefixCls}-rtl`]: direction };
  const mergedRootCls = clsx(rootClassName, cssVarCls, rootCls, rtlCls);
  const mergedCls = clsx(
    prefixCls,
    contextClassName,
    mergedClassNames.root,
    mergedRootCls,
    className,
    hashId,
  );
  const panelContext: PanelPickerContextProps = React.useMemo(
    () => ({
      prefixCls,
      value: panelState.value,
      onChange: panelState.onChange,
      onClear,
      allowClear,
      disabled: mergedDisabled,
      disabledAlpha,
      mode: panelState.mode,
      onModeChange: panelState.onModeChange,
      modeOptions: panelState.modeOptions,
      onChangeComplete: panelState.onChangeComplete,
      activeIndex: panelState.activeIndex,
      onActive: panelState.onActive,
      format: panelState.format,
      onFormatChange: panelState.onFormatChange,
      gradientDragging: panelState.gradientDragging,
      onGradientDragging: panelState.onGradientDragging,
      disabledFormat,
    }),
    [
      allowClear,
      disabledAlpha,
      disabledFormat,
      mergedDisabled,
      onClear,
      panelState.activeIndex,
      panelState.format,
      panelState.gradientDragging,
      panelState.mode,
      panelState.modeOptions,
      panelState.onActive,
      panelState.onChange,
      panelState.onChangeComplete,
      panelState.onFormatChange,
      panelState.onGradientDragging,
      panelState.onModeChange,
      panelState.value,
      prefixCls,
    ],
  );

  const presetContext: PanelPresetsContextProps = React.useMemo(
    () => ({
      prefixCls,
      disabled: mergedDisabled,
      value: panelState.value,
      presets,
      onChange: panelState.onChange,
    }),
    [mergedDisabled, panelState.onChange, panelState.value, prefixCls, presets],
  );

  const innerPanel = (
    <div className={`${prefixCls}-inner-content`}>
      <PanelPicker />
      {Array.isArray(presets) && <Divider />}
      <PanelPresets />
    </div>
  );

  const panelNode = (
    <ContextIsolator form space>
      <PanelPickerContext.Provider value={panelContext}>
        <PanelPresetsContext.Provider value={presetContext}>
          <div className={`${prefixCls}-inner`}>
            {isFunction(panelRender)
              ? panelRender(innerPanel, {
                  components: {
                    Picker: PanelPicker,
                    Presets: PanelPresets,
                  },
                })
              : innerPanel}
          </div>
        </PanelPresetsContext.Provider>
      </PanelPickerContext.Provider>
    </ContextIsolator>
  );

  if (_internalPanelState) {
    return panelNode;
  }

  return (
    <div className={mergedCls} style={mergedStyles.root} {...rest}>
      {panelNode}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
