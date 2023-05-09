import type {
  ColorPickerPanelProps as RcColorPickerPanelProps,
  TriggerPlacement,
  TriggerType,
} from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { CSSProperties } from 'react';
import React, { useContext, useState } from 'react';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import Popover from '../popover';
import theme from '../theme';
import ColorPickerPanel from './ColorPickerPanel';
import type { Color } from './color';
import ColorPlaceholder from './components/ColorPlaceholder';
import useColorState from './hooks/useColorState';
import type { ColorFormat, ColorPickerBaseProps, PresetsItem } from './interface';
import useStyle from './style/index';
import { customizePrefixCls, generateColor } from './util';

export interface ColorPickerProps
  extends Omit<
    RcColorPickerPanelProps,
    'onChange' | 'arrow' | 'value' | 'defaultValue' | 'children' | 'panelRender'
  > {
  value?: Color | string;
  defaultValue?: Color | string;
  children?: React.ReactElement;
  open?: boolean;
  disabled?: boolean;
  placement?: TriggerPlacement;
  trigger?: TriggerType;
  format?: keyof typeof ColorFormat;
  allowClear?: boolean;
  presets?: PresetsItem[];
  arrow?: boolean | { pointAtCenter: boolean };
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  styles?: { popup?: CSSProperties };
  rootClassName?: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format: ColorFormat) => void;
  onChange?: (value: Color, hex: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
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
    style,
    className,
    rootClassName,
    styles,
    onFormatChange,
    onChange,
    onOpenChange,
  } = props;

  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
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
  const [clearColor, setClearColor] = useState(false);

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const mergeRootCls = classNames(rootClassName, {
    [`${prefixCls}-rtl`]: direction,
  });
  const mergeCls = classNames(mergeRootCls, className, hashId);

  const handleChange = (data: Color) => {
    const color: Color = generateColor(data);
    if (clearColor && color.toHsb().a > 0) {
      setClearColor(false);
    }
    if (!value) {
      setColorValue(color);
    }
    onChange?.(color, color.toHexString());
  };

  const handleClear = (clear: boolean) => {
    setClearColor(clear);
  };

  const extraProps = {
    prefixCls,
    open: popupOpen,
    trigger,
    disabled,
    placement,
    arrow,
    rootClassName,
  };

  const colorBaseProps: ColorPickerBaseProps = {
    prefixCls,
    color: colorValue,
    allowClear,
    clearColor,
    disabled,
    presets,
    format,
    onFormatChange,
  };

  return wrapSSR(
    <Popover
      style={styles?.popup}
      onOpenChange={setPopupOpen}
      content={
        <ColorPickerPanel {...colorBaseProps} onChange={handleChange} onClear={handleClear} />
      }
      {...extraProps}
    >
      {children || (
        <ColorPlaceholder
          popupOpen={popupOpen}
          className={mergeCls}
          style={style}
          {...colorBaseProps}
        />
      )}
    </Popover>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPicker.displayName = 'ColorPicker';
}

export default ColorPicker;
