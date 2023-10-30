import type { CSSProperties, FC } from 'react';
import React, { useContext, useMemo, useRef, useState } from 'react';
import type {
  HsbaColorType,
  ColorPickerProps as RcColorPickerProps,
} from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import { useToken } from '../theme/internal';
import type { Color } from './color';
import ColorPickerPanel from './ColorPickerPanel';
import ColorTrigger from './components/ColorTrigger';
import useColorState from './hooks/useColorState';
import type {
  ColorFormat,
  ColorPickerBaseProps,
  ColorValueType,
  PresetsItem,
  TriggerPlacement,
  TriggerType,
} from './interface';
import useStyle from './style/index';
import { customizePrefixCls, genAlphaColor, generateColor, getAlphaColor } from './util';
import { useZIndex } from '../_util/hooks/useZIndex';

export type ColorPickerProps = Omit<
  RcColorPickerProps,
  'onChange' | 'value' | 'defaultValue' | 'panelRender' | 'disabledAlpha' | 'onChangeComplete'
> & {
  value?: ColorValueType;
  defaultValue?: ColorValueType;
  children?: React.ReactNode;
  open?: boolean;
  disabled?: boolean;
  placement?: TriggerPlacement;
  trigger?: TriggerType;
  format?: keyof typeof ColorFormat;
  defaultFormat?: keyof typeof ColorFormat;
  allowClear?: boolean;
  presets?: PresetsItem[];
  arrow?: boolean | { pointAtCenter: boolean };
  panelRender?: (
    panel: React.ReactNode,
    extra: { components: { Picker: FC; Presets: FC } },
  ) => React.ReactNode;
  showText?: boolean | ((color: Color) => React.ReactNode);
  size?: SizeType;
  styles?: { popup?: CSSProperties; popupOverlayInner?: CSSProperties };
  rootClassName?: string;
  disabledAlpha?: boolean;
  [key: `data-${string}`]: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format: ColorFormat) => void;
  onChange?: (value: Color, hex: string) => void;
  onClear?: () => void;
  onChangeComplete?: (value: Color) => void;
} & Pick<PopoverProps, 'getPopupContainer' | 'autoAdjustOverflow' | 'destroyTooltipOnHide'>;

type CompoundedComponent = React.FC<ColorPickerProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const ColorPicker: CompoundedComponent = (props) => {
  const {
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
    ...rest
  } = props;

  const { getPrefixCls, direction, colorPicker } = useContext<ConfigConsumerProps>(ConfigContext);

  const [, token] = useToken();

  const [colorValue, setColorValue] = useColorState(token.colorPrimary, {
    value,
    defaultValue,
  });
  const [popupOpen, setPopupOpen] = useMergedState(false, {
    value: open,
    postState: (openData) => !disabled && openData,
    onChange: onOpenChange,
  });
  const [formatValue, setFormatValue] = useMergedState(format, {
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange,
  });

  const [colorCleared, setColorCleared] = useState(false);

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

  const isAlphaColor = useMemo(() => getAlphaColor(colorValue) < 100, [colorValue]);

  // ===================== Form Status =====================
  const { status: contextStatus } = React.useContext(FormItemInputContext);

  // ===================== Style =====================
  const mergedSize = useSize(customizeSize);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const rtlCls = { [`${prefixCls}-rtl`]: direction };
  const mergeRootCls = classNames(rootClassName, rtlCls);
  const mergeCls = classNames(
    getStatusClassNames(prefixCls, contextStatus),
    {
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-lg`]: mergedSize === 'large',
    },
    colorPicker?.className,
    mergeRootCls,
    className,
    hashId,
  );
  const mergePopupCls = classNames(prefixCls, rtlCls);

  const popupAllowCloseRef = useRef(true);

  // ===================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('ColorPicker');

    warning(
      !(disabledAlpha && isAlphaColor),
      'usage',
      '`disabledAlpha` will make the alpha to be 100% when use alpha color.',
    );
  }

  const handleChange = (data: Color, type?: HsbaColorType, pickColor?: boolean) => {
    let color: Color = generateColor(data);
    const isNull = value === null || (!value && defaultValue === null);
    if (colorCleared || isNull) {
      setColorCleared(false);
      // ignore alpha slider
      if (getAlphaColor(colorValue) === 0 && type !== 'alpha') {
        color = genAlphaColor(color);
      }
    }
    // ignore alpha color
    if (disabledAlpha && isAlphaColor) {
      color = genAlphaColor(color);
    }

    // Only for drag-and-drop color picking
    if (pickColor) {
      popupAllowCloseRef.current = false;
    } else {
      onChangeComplete?.(color);
    }

    setColorValue(color);
    onChange?.(color, color.toHexString());
  };

  const handleClear = () => {
    setColorCleared(true);
    onClear?.();
  };

  const handleChangeComplete: ColorPickerProps['onChangeComplete'] = (color) => {
    popupAllowCloseRef.current = true;
    let changeColor = generateColor(color);
    // ignore alpha color
    if (disabledAlpha && isAlphaColor) {
      changeColor = genAlphaColor(color);
    }
    onChangeComplete?.(changeColor);
  };

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

  const colorBaseProps: ColorPickerBaseProps = {
    prefixCls,
    color: colorValue,
    allowClear,
    colorCleared,
    disabled,
    disabledAlpha,
    presets,
    panelRender,
    format: formatValue,
    onFormatChange: setFormatValue,
    onChangeComplete: handleChangeComplete,
  };

  const mergedStyle: React.CSSProperties = { ...colorPicker?.style, ...style };

  // ============================ zIndex ============================
  const [zIndex] = useZIndex('ColorPicker');

  return wrapSSR(
    <Popover
      style={styles?.popup}
      overlayInnerStyle={styles?.popupOverlayInner}
      onOpenChange={(visible) => {
        if (popupAllowCloseRef.current && !disabled) {
          setPopupOpen(visible);
        }
      }}
      content={
        <NoFormStyle override status>
          <ColorPickerPanel
            {...colorBaseProps}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
            onClear={handleClear}
          />
        </NoFormStyle>
      }
      overlayClassName={mergePopupCls}
      zIndex={zIndex}
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          open={popupOpen}
          className={mergeCls}
          style={mergedStyle}
          color={value ? generateColor(value) : colorValue}
          prefixCls={prefixCls}
          disabled={disabled}
          colorCleared={colorCleared}
          showText={showText}
          format={formatValue}
          {...rest}
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
  'color-picker',
  /* istanbul ignore next */
  (prefixCls) => prefixCls,
  (props: ColorPickerProps) => ({
    ...props,
    placement: 'bottom' as TriggerPlacement,
    autoAdjustOverflow: false,
  }),
);

ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default ColorPicker;
