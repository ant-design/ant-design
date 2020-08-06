import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_util/type';
import { PresetColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';

type RibbonPlacement = 'start' | 'end';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType, string>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

const Ribbon: React.FC<RibbonProps> = function Ribbon({
  className,
  prefixCls: customizePrefixCls,
  style,
  color,
  children,
  text,
  placement = 'end',
}) {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  const colorInPreset = isPresetColor(color);
  const ribbonCls = classNames(prefixCls, className, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-color-${color}`]: colorInPreset,
  });
  const colorStyle: React.CSSProperties = {};
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return (
    <div className={`${prefixCls}-wrapper`}>
      {children}
      <div className={ribbonCls} style={{ ...colorStyle, ...style }}>
        {text}
        <div className={`${prefixCls}-corner`} style={cornerColorStyle} />
      </div>
    </div>
  );
};

export default Ribbon;
