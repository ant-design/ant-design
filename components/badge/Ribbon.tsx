import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_util/type';
import { PresetColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';
import useStyle from './style';

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
  const { getPrefixCls, direction, iconPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  const colorInPreset = isPresetColor(color);
  const ribbonCls = classNames(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
  );
  const [wrapSSR, hashId] = useStyle(getPrefixCls(), prefixCls, iconPrefixCls);
  const colorStyle: React.CSSProperties = {};
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return wrapSSR(
    <div className={classNames(`${prefixCls}-wrapper`, hashId)}>
      {children}
      <div className={classNames(ribbonCls, hashId)} style={{ ...colorStyle, ...style }}>
        <span className={`${prefixCls}-text`}>{text}</span>
        <div className={`${prefixCls}-corner`} style={cornerColorStyle} />
      </div>
    </div>,
  );
};

export default Ribbon;
