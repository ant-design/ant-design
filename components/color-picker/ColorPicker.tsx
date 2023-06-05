import type {
  HsbaColorType,
  ColorPickerProps as RcColorPickerProps,
} from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { CSSProperties } from 'react';
import React, { useContext, useRef, useState } from 'react';
import genPurePanel from '../_util/PurePanel';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
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
  PresetsItem,
  TriggerPlacement,
  TriggerType,
} from './interface';
import useStyle from './style/index';
import { customizePrefixCls, generateColor } from './util';

export interface ColorPickerProps
  extends Omit<RcColorPickerProps, 'onChange' | 'value' | 'defaultValue' | 'panelRender'> {
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
  styles?: { popup?: CSSProperties };
  rootClassName?: string;
  onOpenChange?: (open: boolean) => void;
  onFormatChange?: (format: ColorFormat) => void;
  onChange?: (value: Color, hex: string) => void;
  onClear?: () => void;
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
    onClear,
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
  const [colorCleared, setColorCleared] = useState(false);

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const rtlCls = { [`${prefixCls}-rtl`]: direction };
  const mergeRootCls = classNames(rootClassName, rtlCls);
  const mergeCls = classNames(mergeRootCls, className, hashId);
  const mergePopupCls = classNames(prefixCls, rtlCls);

  const popupAllowCloseRef = useRef(true);

  const handleChange = (data: Color, type?: HsbaColorType, pickColor?: boolean) => {
    let color: Color = generateColor(data);
    if (colorCleared) {
      setColorCleared(false);
      const hsba = color.toHsb();
      // ignore alpha slider
      if (colorValue.toHsb().a === 0 && type !== 'alpha') {
        hsba.a = 1;
        color = generateColor(hsba);
      }
    }
    if (!value) {
      setColorValue(color);
    }
    // Only for drag-and-drop color picking
    if (pickColor) {
      popupAllowCloseRef.current = false;
    }
    onChange?.(color, color.toHexString());
  };

  const handleClear = () => {
    setColorCleared(true);
    onClear?.();
  };

  const handleChangeComplete = () => {
    popupAllowCloseRef.current = true;
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
    colorCleared,
    disabled,
    presets,
    format,
    onFormatChange,
  };

  return wrapSSR(
    <Popover
      style={styles?.popup}
      onOpenChange={(visible) => {
        if (popupAllowCloseRef.current) {
          setPopupOpen(visible);
        }
      }}
      content={
        <ColorPickerPanel
          {...colorBaseProps}
          onChange={handleChange}
          onChangeComplete={handleChangeComplete}
          onClear={handleClear}
        />
      }
      overlayClassName={mergePopupCls}
      {...popoverProps}
    >
      {children || (
        <ColorTrigger
          open={popupOpen}
          className={mergeCls}
          style={style}
          color={colorValue}
          prefixCls={prefixCls}
          disabled={disabled}
          colorCleared={colorCleared}
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
