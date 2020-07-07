import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_util/type';
import { PresetColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';

type RibbonPlacement = 'start' | 'end';
type MergedRibbonPlacement = 'left' | 'right';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType, string>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

function getMergedPlacement(placement: RibbonPlacement, isRtl: boolean): MergedRibbonPlacement {
  if (placement === 'start') {
    return isRtl ? 'right' : 'left';
  }
  return isRtl ? 'left' : 'right';
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
  const isRtl = direction === 'rtl';
  const mergedPlacement = getMergedPlacement(placement, isRtl);
  const ribbonCls = classNames(prefixCls, className, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: isRtl,
    [`${prefixCls}-color-${color}`]: isPresetColor(color),
  });
  const colorStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    colorStyle.background = color;
  }
  const cornerColorStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    cornerColorStyle.borderTopColor = color;
    if (mergedPlacement === 'left') {
      cornerColorStyle.borderRightColor = color;
    } else {
      cornerColorStyle.borderLeftColor = color;
    }
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
