import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_util/type';
import { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';

export interface RibbonProps {
  ribbonPrefixCls?: string;
  ribbonWrapperPrefixCls?: string;
  ribbonStyle?: React.CSSProperties;
  ribbonWrapperStyle?: React.CSSProperties;
  text?: React.ReactNode;
  status?: PresetStatusColorType;
  color?: LiteralUnion<PresetColorType, string>;
  children?: React.ReactNode;
  className?: string;
}

const Ribbon: React.FC<RibbonProps> = function Ribbon({
  className,
  ribbonPrefixCls: customizeRibbonPrefixCls,
  ribbonWrapperPrefixCls: customizeRibbonWrapperPrefixCls,
  ribbonStyle,
  ribbonWrapperStyle,
  status,
  color,
  children,
  text,
}) {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const ribbonPrefixCls = getPrefixCls('ribbon', customizeRibbonPrefixCls);
  const ribbonCornerPrefixCls = getPrefixCls('ribbon-corner', customizeRibbonPrefixCls);
  const ribbonWrapperPrefixCls = getPrefixCls('ribbon-wrapper', customizeRibbonWrapperPrefixCls);
  const ribbonCls = classNames(ribbonPrefixCls, className, {
    [`${ribbonPrefixCls}-rtl`]: direction === 'rtl',
    [`${ribbonPrefixCls}-status-${status}`]: !!status,
    [`${ribbonPrefixCls}-status-${color}`]: isPresetColor(color),
  });
  const ribbonCornerCls = classNames(ribbonCornerPrefixCls);
  const ribbonWrapperCls = classNames(ribbonWrapperPrefixCls);
  const ribbonStatusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    ribbonStatusStyle.background = color;
  }
  const ribbonCornerStatusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    ribbonStatusStyle.borderColor = color;
  }
  return (
    <div className={ribbonWrapperCls} style={ribbonWrapperStyle}>
      {children}
      <div className={ribbonCls} style={{ ...ribbonStatusStyle, ...ribbonStyle }}>
        {text}
        <div className={ribbonCornerCls} style={ribbonCornerStatusStyle} />
      </div>
    </div>
  );
};

export default Ribbon;
