import React, { useContext } from 'react';
import { useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import type { GetProp } from '../_util/type';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import { useCompactItemContext } from '../space/Compact';
import useMergedArrow from '../tooltip/hook/useMergedArrow';
import type { ColorPickerPanelProps } from './ColorPickerPanel';
import ColorPickerPanel from './ColorPickerPanel';
import ColorTrigger from './components/ColorTrigger';
import useColorPickerPanelState from './hooks/useColorPickerPanelState';
import type { ColorPickerProps, ColorPickerSemanticAllType, TriggerPlacement } from './interface';
import useStyle from './style';

type CompoundedComponent = React.FC<ColorPickerProps> & {
  Panel: React.FC<ColorPickerPanelProps>;
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

  const contextStyleRoot = useSemanticRootStyle(contextStyle);
  const styleRoot = useSemanticRootStyle(style);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ColorPickerSemanticAllType['classNames'],
    ColorPickerSemanticAllType['styles'],
    ColorPickerProps
  >(
    [contextClassNames, classNames],
    [contextStyles, contextStyleRoot, styles, styleRoot],
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
  const triggerOpenChange = (visible: boolean) => {
    if (!visible || !mergedDisabled) {
      setPopupOpen(visible);
      onOpenChange?.(visible);
    }
  };

  const panelProps = useColorPickerPanelState(
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
    'ColorPicker',
  );

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

  // ============================ zIndex ============================

  return (
    <Popover
      classNames={{ root: mergedPopupCls }}
      styles={{
        root: mergedStyles.popup?.root,
        container: (styles as GetProp<ColorPickerProps, 'styles', 'Return'>)?.popupOverlayInner,
      }}
      onOpenChange={triggerOpenChange}
      content={
        <ColorPickerPanel
          _internalPanelState={panelProps}
          prefixCls={customizePrefixCls}
          allowClear={allowClear}
          disabled={mergedDisabled}
          disabledAlpha={disabledAlpha}
          presets={presets}
          panelRender={panelRender}
          onClear={onClear}
          disabledFormat={disabledFormat}
        />
      }
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          activeIndex={popupOpen ? panelProps.activeIndex : -1}
          open={popupOpen}
          className={mergedCls}
          classNames={mergedClassNames}
          styles={mergedStyles}
          prefixCls={prefixCls}
          disabled={mergedDisabled}
          showText={showText}
          format={panelProps.format}
          {...rest}
          color={panelProps.value}
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

ColorPicker.Panel = ColorPickerPanel as React.FC<ColorPickerPanelProps>;
ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default ColorPicker;
