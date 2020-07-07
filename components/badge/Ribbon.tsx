import * as React from 'react';
import classNames from 'classnames';
import { LiteralUnion } from '../_util/type';
import { PresetColorType } from '../_util/colors';
import { ConfigContext } from '../config-provider';
import { isPresetColor } from './utils';

type RibbonPlacement = 'left' | 'right' | 'start' | 'end';
type MergedRibbonPlacement = 'left' | 'right';

export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  wrapperPrefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType, string>;
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

function getMergedPlacement(placement: RibbonPlacement, isRtl: boolean): MergedRibbonPlacement {
  if (placement === 'left' || placement === 'right') {
    return placement;
  }
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
  const cornerPrefixCls = `${prefixCls}-corner`;
  const wrapperPrefixCls = `${prefixCls}-wrapper`;
  const isRtl = direction === 'rtl';
  const mergedPlacement = getMergedPlacement(placement, isRtl);
  const ribbonCls = classNames(prefixCls, className, {
    [`${prefixCls}-rtl`]: isRtl,
    [`${prefixCls}-color-${color}`]: isPresetColor(color),
    [`${prefixCls}-placement-${mergedPlacement}`]: true,
  });
  const cornerCls = classNames(cornerPrefixCls);
  const wrapperCls = classNames(wrapperPrefixCls);
  const colorStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    colorStyle.background = color;
  }
  const cornerStatusStyle: React.CSSProperties = {};
  if (color && !isPresetColor(color)) {
    cornerStatusStyle.borderTopColor = color;
    if (mergedPlacement === 'left') {
      cornerStatusStyle.borderRightColor = color;
    } else {
      cornerStatusStyle.borderLeftColor = color;
    }
  }
  return (
    <div className={wrapperCls}>
      {children}
      <div className={ribbonCls} style={{ ...colorStyle, ...style }}>
        {text}
        <div className={cornerCls} style={cornerStatusStyle} />
      </div>
    </div>
  );
};

export default Ribbon;
