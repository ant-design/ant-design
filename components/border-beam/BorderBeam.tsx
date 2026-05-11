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
  const { borderSize, borderRadius } = useBorderSize(childDomNode);
  const [borderTopSize, borderRightSize, borderBottomSize, borderLeftSize] = borderSize;
  const [
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  ] = borderRadius;

  // ============================ Border ============================
  const getBorderWidth = (size: number) => {
    const mergedSize: string | number = outset ?? size;
    return typeof mergedSize === 'string' ? `calc(-1 * ${mergedSize})` : `-${mergedSize}px`;
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
          [varName('beam-gradient')]: getBorderBeamGradient(color, '#1677ff', '#4096ff'),
          [varName('border-top-width')]: getBorderWidth(borderTopSize),
          [varName('border-right-width')]: getBorderWidth(borderRightSize),
          [varName('border-bottom-width')]: getBorderWidth(borderBottomSize),
          [varName('border-left-width')]: getBorderWidth(borderLeftSize),
          [varName('border-top-left-radius')]: borderTopLeftRadius,
          [varName('border-top-right-radius')]: borderTopRightRadius,
          [varName('border-bottom-right-radius')]: borderBottomRightRadius,
          [varName('border-bottom-left-radius')]: borderBottomLeftRadius,
        }}
      />
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
