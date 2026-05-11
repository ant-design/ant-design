import React from 'react';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { genCssVar } from '../theme/util/genStyleUtils';
import BorderBeamEffect from './BorderBeamEffect';
import useBorderSize from './hooks/useBorderSize';
import useChildDom from './hooks/useChildDom';
import useStyle from './style';
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
  const { prefixCls: customizePrefixCls, children } = props;

  const { getPrefixCls } = useComponentConfig('borderBeam');

  // ============================ Prefix ============================
  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

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

  // ============================ Render ============================
  return (
    <>
      {childNode}
      <BorderBeamEffect
        prefixCls={prefixCls}
        hostDom={childDomNode}
        className={clsx(hashId, cssVarCls)}
        style={{
          [varName('border-top-width')]: `-${borderTopSize}px`,
          [varName('border-right-width')]: `-${borderRightSize}px`,
          [varName('border-bottom-width')]: `-${borderBottomSize}px`,
          [varName('border-left-width')]: `-${borderLeftSize}px`,
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
