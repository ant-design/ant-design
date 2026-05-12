import React from 'react';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import { genCssVar } from '../theme/util/genStyleUtils';
import BorderBeamEffect from './BorderBeamEffect';
import useBorderSize from './hooks/useBorderSize';
import useChildDom from './hooks/useChildDom';
import useStyle from './style';
import { getBorderBeamGradient } from './util';
import type { BorderBeamColor } from './util';

export type { BorderBeamColor, BorderBeamGradient } from './util';

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: BorderBeamColor;
  outset?: number | string;
}

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const { prefixCls: customizePrefixCls, className, style, children, color, outset } = props;

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
  const beamGradient = getBorderBeamGradient(color);

  // ============================ Border ============================
  const getInsetOffset = () => {
    const getInset = (width: number | string) =>
      typeof width === 'string' ? `calc(-1 * ${width})` : `-${width}px`;

    return outset === undefined ? borderWidth.map(getInset).join(' ') : getInset(outset);
  };

  // ============================ Render ============================
  return (
    <>
      {childNode}
      <BorderBeamEffect
        prefixCls={prefixCls}
        hostDom={childDomNode}
        className={clsx(contextClassName, className, hashId, cssVarCls)}
        style={{
          ...contextStyle,
          ...style,
          ...(beamGradient && { [varName('beam-gradient')]: beamGradient }),
          [varName('inset-offset')]: getInsetOffset(),
          [varName('border-radius')]: borderRadius,
        }}
      />
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
