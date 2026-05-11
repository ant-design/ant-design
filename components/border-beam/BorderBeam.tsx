import React from 'react';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import BorderBeamEffect from './BorderBeamEffect';
import useBorderBeamGeometry from './hooks/useBorderBeamGeometry';
import useBorderBeamInjection from './hooks/useBorderBeamInjection';
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
  const [, token] = useToken();
  const { prefixCls: customizePrefixCls, children } = props;

  const { getPrefixCls } = useComponentConfig('borderBeam');

  // ============================ Prefix ============================
  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

  // ========================= BorderWidth ==========================
  const mergedBorderWidth = token.BorderBeam?.borderBeamWidth ?? token.lineWidth;

  // ============================= Host =============================
  // `hostElement` is the real DOM node that carries the beam holder. It is the decorated
  // child in direct mode. Use state so the first resolved host can trigger the one-time
  // injection and radius measurement flow.
  const [childNode, childDomNode] = useChildDom(children);
  const childHostElement =
    typeof HTMLElement === 'undefined' || childDomNode instanceof HTMLElement
      ? (childDomNode as HTMLElement | null)
      : null;

  const { canInjectIntoChild } = useBorderBeamInjection({
    children,
    hostElement: childHostElement,
  });
  const hostElement = childHostElement;
  const { beamVisible } = useBorderBeamGeometry({
    prefixCls,
    hostElement,
    canInjectIntoChild,
  });
  const { borderSize, borderRadius } = useBorderSize(hostElement);
  const [borderTopSize, borderRightSize, borderBottomSize, borderLeftSize] = borderSize;
  const [
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  ] = borderRadius;

  // ============================ Styles ============================
  const beamStyle = React.useMemo(() => {
    const nextBeamStyle: React.CSSProperties = {};

    if (!beamVisible || mergedBorderWidth <= 0) {
      nextBeamStyle.display = 'none';
    }

    return nextBeamStyle;
  }, [beamVisible, mergedBorderWidth]);

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
          ...beamStyle,
        }}
      />
    </>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
