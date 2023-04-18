import type { TriggerPlacement, TriggerType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';
import classNames from 'classnames';
import type { CSSProperties, ReactElement } from 'react';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import theme from '../theme';
import { getTransitionName } from '../_util/motion';
import getPlacements from '../_util/placements';
import type { Color } from './color';
import ColorPlaceholder from './components/ColorPlaceholder';
import ExPanel from './ExPanel';
import useColorState from './hooks/useColorState';
import type { ColorFormat, ColorPickerBaseProps, PressetsItem } from './interface';
import useStyle from './style/index';
import { customizePrefixCls, generateColor } from './util';

export interface ColorPickerProps {
  value?: Color | string;
  defaultValue?: Color | string;
  format?: ColorFormat;
  onFormatChange?: (format: ColorFormat) => void;
  onChange?: (value: Color, hex: string) => void;
  allowClear?: boolean;
  presets?: PressetsItem[];
  children?: ReactElement;
  trigger?: TriggerType;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placement?: TriggerPlacement;
  arrow?: boolean | { pointAtCenter: boolean };
  prefixCls?: string;
  style?: CSSProperties;
  className?: string;
  rootClassName?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const {
    value,
    defaultValue,
    format = 'hex',
    onFormatChange,
    onChange,
    allowClear = false,
    // presets,
    children,
    trigger = 'click',
    open,
    onOpenChange,
    disabled,
    placement = 'bottomLeft',
    arrow = true,
    style,
    className,
    rootClassName,
  } = props;

  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const { token } = theme.useToken();

  const [colorValue, setColorValue] = useColorState(token.colorPrimary, {
    value,
    defaultValue,
  });
  const [popupOpen, setPopupOpen] = useState(open);
  const [clearColor, setClearColor] = useState(false);

  const prefixCls = getPrefixCls('color-picker', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const mergeCls = classNames(`${prefixCls}-root`, className, rootClassName, hashId);

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius,
  });

  useEffect(() => {
    setPopupOpen(open);
  }, [open]);

  const currentlacement = useMemo(() => {
    if (!placement) {
      return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    }

    return placement;
  }, [placement, direction]);

  const handleChange = (data: Color) => {
    const color: Color = generateColor(data);
    if (clearColor && color.toHsb().a > 0) {
      setClearColor(false);
    }
    if (value) {
      onChange?.(color, color.toHexString());
    } else {
      setColorValue(color);
    }
  };

  const handleOpenChange = (openData: boolean) => {
    if (typeof open === 'boolean') {
      onOpenChange?.(openData);
    } else {
      setPopupOpen(openData);
    }
  };

  const updateColor = (colorData: Color) => {
    handleChange(colorData);
  };

  const updateClearColor = (clear: boolean) => {
    setClearColor(clear);
  };

  const extraProps = {
    prefixCls,
    builtinPlacements,
    open,
    trigger,
    disabled,
  };

  const colorBaseProps: ColorPickerBaseProps = {
    prefixCls,
    color: colorValue,
    allowClear,
    clearColor,
    format,
    onFormatChange,
    updateColor,
    updateClearColor,
  };

  return wrapSSR(
    <RcColorPicker
      value={colorValue.toHsb()}
      classNames={{
        popup: hashId,
      }}
      style={{
        popup: style,
      }}
      placement={currentlacement}
      arrow={!!arrow}
      motion={{
        motionName: getTransitionName(rootPrefixCls, 'slide-up'),
        motionDeadline: 1000,
      }}
      onChange={handleChange}
      onOpenChange={handleOpenChange}
      panelRender={(panel) => <ExPanel {...colorBaseProps}>{panel}</ExPanel>}
      {...extraProps}
    >
      <div className={mergeCls}>
        {children || <ColorPlaceholder popupOpen={popupOpen} {...colorBaseProps} />}
      </div>
    </RcColorPicker>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPicker.displayName = 'ColorPicker';
}

export default ColorPicker;
