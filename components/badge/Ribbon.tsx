import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { PresetColorType } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import useStyle from './style';
import { isPresetColor } from '../_util/colors';

type RibbonPlacement = 'start' | 'end';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

const Ribbon: React.FC<RibbonProps> = ({
  className,
  prefixCls: customizePrefixCls,
  style,
  color,
  children,
  text,
  placement = 'end',
}) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('ribbon', customizePrefixCls);
  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = classNames(
    prefixCls,
    `${prefixCls}-placement-${placement}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-color-${color}`]: colorInPreset,
    },
    className,
  );
  const [wrapSSR, hashId] = useStyle(prefixCls);
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

if (process.env.NODE_ENV !== 'production') {
  Ribbon.displayName = 'Ribbon';
}

export default Ribbon;
