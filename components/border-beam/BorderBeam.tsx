import React, { useMemo } from 'react';
import { unit } from '@ant-design/cssinjs';
import { clsx } from 'clsx';

import { isNonNullable, isNumber, isString } from '../_util/is';
import { useComponentConfig } from '../config-provider/context';
import { genCssVar } from '../theme/util/genStyleUtils';
import BorderBeamEffect from './BorderBeamEffect';
import useBorderSize from './hooks/useBorderSize';
import useChildDom from './hooks/useChildDom';
import useStyle from './style';
import { DEFAULT_BORDER_BEAM_DURATION, getBorderBeamGradient } from './util';
import type { BorderBeamColor } from './util';

export type { BorderBeamColor, BorderBeamGradient } from './util';

const getInset = (width: number | string) => {
  return isString(width) ? `calc(-1 * ${width})` : `-${width}px`;
};

export interface BorderBeamItem {
  color?: BorderBeamColor;
  lineWidth?: number | string;
  outset?: number | string;
  size?: number | string;
}

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: BorderBeamColor;
  count?: number | BorderBeamItem[];
  duration?: number;
  lineWidth?: number | string;
  outset?: number | string;
  size?: number | string;
}

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    color,
    count = 1,
    duration,
    lineWidth,
    outset,
    size,
  } = props;

  const {
    className: contextClassName,
    style: contextStyle,
    getPrefixCls,
  } = useComponentConfig('borderBeam');

  // ============================ Prefix ============================
  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const [varName] = genCssVar(getPrefixCls(), 'border-beam');

  // ============================= Host =============================
  const [childNode, childDomNode] = useChildDom(children);
  const borderWidth = useBorderSize(childDomNode);
  const beamGradient = useMemo(() => getBorderBeamGradient(color), [color]);
  const beamItems = useMemo<BorderBeamItem[]>(() => {
    if (Array.isArray(count)) {
      return count;
    }

    const mergedCount =
      isNumber(count) && Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1;

    return Array.from({ length: mergedCount }, () => ({}));
  }, [count]);
  const mergedCount = beamItems.length;
  const mergedDuration =
    isNumber(duration) && duration > 0 ? duration : DEFAULT_BORDER_BEAM_DURATION;

  // ============================ Border ============================
  const insetOffset = useMemo<string>(() => {
    return isNonNullable(outset) ? getInset(outset) : borderWidth.map<string>(getInset).join(' ');
  }, [borderWidth, outset]);

  // ============================ Render ============================
  return (
    <>
      {childNode}
      {beamItems.map((item, index) => {
        const beamPhase = index / mergedCount;
        const beamKey = `${mergedCount}-${beamPhase}`;
        const itemBeamGradient = isNonNullable(item.color)
          ? getBorderBeamGradient(item.color)
          : beamGradient;
        const itemLineWidth = isNonNullable(item.lineWidth) ? item.lineWidth : lineWidth;
        const itemSize = isNonNullable(item.size) ? item.size : size;
        const itemInsetOffset = isNonNullable(item.outset) ? getInset(item.outset) : insetOffset;

        return (
          <BorderBeamEffect
            key={beamKey}
            prefixCls={prefixCls}
            hostDom={childDomNode}
            className={clsx(contextClassName, className, hashId, cssVarCls)}
            style={{
              ...contextStyle,
              ...style,
              ...(itemBeamGradient && { [varName('beam-gradient')]: itemBeamGradient }),
              ...(isNumber(duration) &&
                duration > 0 && {
                  [varName('duration')]: `${duration}s`,
                }),
              ...(isNonNullable(itemLineWidth) && {
                [varName('line-width')]: unit(itemLineWidth),
              }),
              ...(isNonNullable(itemSize) && { [varName('size')]: unit(itemSize) }),
              ...(beamPhase > 0 && {
                [varName('delay')]: `${-mergedDuration * beamPhase}s`,
              }),
              [varName('inset-offset')]: itemInsetOffset,
            }}
          />
        );
      })}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
