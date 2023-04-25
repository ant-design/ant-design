import type { ColorPickerProps as RcColorPickerProps } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { CSSProperties } from 'react';
import React, { useContext, useMemo, useState } from 'react';
import { getTransitionName } from '../_util/motion';
import getPlacements from '../_util/placements';
import type { ConfigConsumerProps } from '../config-provider/context';
import { ConfigContext } from '../config-provider/context';
import theme from '../theme';
import ExPanel from './ExPanel';
import type { Color } from './color';
import ColorPlaceholder from './components/ColorPlaceholder';
import useColorState from './hooks/useColorState';
import type { ColorFormat, ColorPickerBaseProps, PresetsItem } from './interface';
import useStyle from './style/index';
import { customizePrefixCls, generateColor } from './util';

export interface ColorPickerProps
  extends Omit<RcColorPickerProps, 'onChange' | 'arrow' | 'value' | 'defaultValue' | 'children'> {
  value?: Color | string;
  defaultValue?: Color | string;
  children?: React.ReactElement;
  format?: ColorFormat;
  onFormatChange?: (format: ColorFormat) => void;
  onChange?: (value: Color, hex: string) => void;
  allowClear?: boolean;
  presets?: PresetsItem[];
  arrow?: boolean | { pointAtCenter: boolean };
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
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
    presets,
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
    styles,
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
  const rootPrefixCls = getPrefixCls();

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const mergeCls = classNames(rootClassName, className, hashId);
  const mergePopupCls = classNames(rootClassName, hashId);

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === 'object' && arrow.pointAtCenter,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius,
  });

  const currentPlacement = useMemo(() => {
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
    styles,
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
    updateColor,
    updateClearColor,
  };

  return wrapSSR(
    <RcColorPicker
      value={colorValue.toHsb()}
      classNames={{
        popup: mergePopupCls,
      }}
      placement={currentPlacement}
      arrow={!!arrow}
      motion={{
        motionName: getTransitionName(rootPrefixCls, 'slide-up'),
        motionDeadline: 1000,
      }}
      onChange={handleChange}
      onOpenChange={setPopupOpen}
      panelRender={(panel) => <ExPanel {...colorBaseProps}>{panel}</ExPanel>}
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
    </RcColorPicker>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPicker.displayName = 'ColorPicker';
}

export default ColorPicker;
