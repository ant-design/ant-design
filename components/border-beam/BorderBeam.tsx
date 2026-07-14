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

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: BorderBeamColor;
  count?: number;
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
  const { borderWidth, borderRadius } = useBorderSize(childDomNode);
  const beamGradient = useMemo(() => getBorderBeamGradient(color), [color]);
  const mergedCount =
    isNumber(count) && Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1;
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
      {Array.from({ length: mergedCount }, (_, index) => (
        <BorderBeamEffect
          key={index}
          prefixCls={prefixCls}
          hostDom={childDomNode}
          className={clsx(contextClassName, className, hashId, cssVarCls)}
          style={{
            ...contextStyle,
            ...style,
            ...(beamGradient && { [varName('beam-gradient')]: beamGradient }),
            ...(isNumber(duration) && duration > 0 && { [varName('duration')]: `${duration}s` }),
            ...(isNonNullable(lineWidth) && { [varName('line-width')]: unit(lineWidth) }),
            ...(isNonNullable(size) && { [varName('size')]: unit(size) }),
            ...(index > 0 && {
              [varName('delay')]: `${(-mergedDuration * index) / mergedCount}s`,
            }),
            [varName('inset-offset')]: insetOffset,
            [varName('border-radius')]: borderRadius,
          }}
        />
      ))}
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
