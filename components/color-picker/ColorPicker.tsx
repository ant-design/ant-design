import type {
  HsbaColorType,
  ColorPickerProps as RcColorPickerProps,
} from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { CSSProperties, FC } from 'react';
import React, { useContext, useRef, useState } from 'react';
import genPurePanel from '../_util/PurePanel';
import { getStatusClassNames } from '../_util/statusUtils';
import type { SizeType } from '../config-provider/SizeContext';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import theme from '../theme';
import ColorPickerPanel from './ColorPickerPanel';
import type { Color } from './color';
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
import { customizePrefixCls, generateColor } from './util';

export type ColorPickerProps = Omit<
  RcColorPickerProps,
  'onChange' | 'value' | 'defaultValue' | 'panelRender' | 'onChangeComplete'
> & {
  value?: ColorValueType;
  defaultValue?: ColorValueType;
  children?: React.ReactNode;
  open?: boolean;
  disabled?: boolean;
  placement?: TriggerPlacement;
  trigger?: TriggerType;
  format?: keyof typeof ColorFormat;
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
    onFormatChange,
    onChange,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide,
  } = props;

  const { getPrefixCls, direction, colorPicker } = useContext<ConfigConsumerProps>(ConfigContext);

  const { token } = theme.useToken();

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
    onChange: onFormatChange,
  });

  const [colorCleared, setColorCleared] = useState(false);

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

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

  const handleChange = (data: Color, type?: HsbaColorType, pickColor?: boolean) => {
    let color: Color = generateColor(data);
    const isNull = value === null || (!value && defaultValue === null);
    if (colorCleared || isNull) {
      setColorCleared(false);
      const hsba = color.toHsb();
      // ignore alpha slider
      if (colorValue.toHsb().a === 0 && type !== 'alpha') {
        hsba.a = 1;
        color = generateColor(hsba);
      }
    }
    // Only for drag-and-drop color picking
    if (pickColor) {
      popupAllowCloseRef.current = false;
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
    onChangeComplete?.(generateColor(color));
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
    presets,
    panelRender,
    format: formatValue,
    onFormatChange: setFormatValue,
    onChangeComplete: handleChangeComplete,
  };

  const mergedStyle: React.CSSProperties = { ...colorPicker?.style, ...style };

  return wrapSSR(
    <Popover
      style={styles?.popup}
      overlayInnerStyle={styles?.popupOverlayInner}
      onOpenChange={(visible) => {
        if (popupAllowCloseRef.current) {
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
