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

  // ============================ Border ============================
  const getBorderWidth = () => {
    if (outset === undefined) {
      return borderWidth;
    }

    return typeof outset === 'string' ? `calc(-1 * ${outset})` : `-${outset}px`;
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
          [varName('border-width')]: getBorderWidth(),
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
