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
import type { PopoverProps } from '../popover';
import Popover from '../popover';
import theme from '../theme';
import ColorPickerPanel from './ColorPickerPanel';
import type { Color } from './color';
import ColorTrigger from './components/ColorTrigger';
import useColorState from './hooks/useColorState';
import type { ColorFormat, ColorPickerBaseProps, PresetsItem } from './interface';
import useStyle from './style/index';
import { customizePrefixCls, generateColor } from './util';
import genPurePanel from '../_util/PurePanel';

export interface ColorPickerProps
  extends Omit<
    RcColorPickerPanelProps,
    'onChange' | 'arrow' | 'value' | 'defaultValue' | 'children' | 'panelRender'
  > {
  value?: Color | string;
  defaultValue?: Color | string;
  children?: React.ReactNode;
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
  getPopupContainer?: PopoverProps['getPopupContainer'];
  autoAdjustOverflow?: PopoverProps['autoAdjustOverflow'];
}

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
    style,
    className,
    rootClassName,
    styles,
    onFormatChange,
    onChange,
    onOpenChange,
    getPopupContainer,
    autoAdjustOverflow = true,
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

  const popoverProps: PopoverProps = {
    open: popupOpen,
    trigger,
    placement,
    arrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
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
      overlayClassName={prefixCls}
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          open={popupOpen}
          className={mergeCls}
          style={style}
          color={colorValue}
          prefixCls={prefixCls}
          clearColor={clearColor}
          disabled={disabled}
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
  (prefixCls) => prefixCls,
  (props: ColorPickerProps) => ({
    ...props,
    placement: 'bottom' as TriggerPlacement,
    autoAdjustOverflow: false,
  }),
);

ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default ColorPicker;
