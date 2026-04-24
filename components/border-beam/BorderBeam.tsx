import React from 'react';
import { useEvent } from '@rc-component/util';
import { getDOM } from '@rc-component/util/lib/Dom/findDOMNode';
import { composeRef, getNodeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import { cloneElement } from '../_util/reactNode';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import useBorderBeamEffect from './hooks/useBorderBeamEffect';
import useBorderBeamGeometry from './hooks/useBorderBeamGeometry';
import useBorderBeamInjection from './hooks/useBorderBeamInjection';
import useStyle from './style';
import { getBorderBeamGradient, getMotionPathRadius } from './util';
import type { BorderBeamColor } from './util';

export type { BorderBeamColor, BorderBeamGradient } from './util';

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  color?: BorderBeamColor;
}

// Keep the motion defaults in CSS variables so both direct-injection and wrapper mode
// consume the same runtime contract.
const DEFAULT_BEAM_DURATION = 6;
const DEFAULT_BEAM_DELAY = 0;
const DEFAULT_BEAM_OFFSET_START = 0;
const DEFAULT_BEAM_OFFSET_END = 100;
const DEFAULT_BEAM_SIZE = 100;
// Make the motion path slightly rounder than the visible track to smooth corner transitions.
const DEFAULT_MOTION_PATH_RADIUS = 200;
// Keep the head slightly ahead of the path so the transparent tail remains visible.
const DEFAULT_BEAM_ANCHOR = '90%';

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const [, token] = useToken();
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    color,
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('borderBeam');

  // ============================ Prefix ============================
  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

  // ============================ BorderWidth ============================
  const mergedBorderWidth = token.BorderBeam?.borderBeamWidth ?? token.lineWidth;

  // ============================ Color ============================
  const fallbackStartColor = token.colorPrimary;
  const fallbackEndColor = token.colorPrimaryHover;
  const mergedBeamGradient = getBorderBeamGradient(color, fallbackStartColor, fallbackEndColor);
  const rootClsName = clsx(prefixCls, className, contextClassName, hashId, cssVarCls);

  // ============================ Host ============================
  // `hostElement` is the real DOM node that carries the beam holder. It is the decorated
  // child in direct mode and the synthetic wrapper in fallback mode. Use state so the first
  // resolved host can trigger the one-time injection and radius measurement flow.
  const [hostElement, setHostElement] = React.useState<HTMLElement | null>(null);
  const setHostNode = useEvent((node: React.ReactInstance | HTMLElement | null) => {
    const nextHostElement = getDOM(node);
    const nextHTMLElement =
      typeof HTMLElement === 'undefined' || nextHostElement instanceof HTMLElement
        ? (nextHostElement as HTMLElement | null)
        : null;

    setHostElement((prevHostElement) =>
      /* istanbul ignore next -- repeated writes of the same DOM ref do not change any observable behavior */
      prevHostElement === nextHTMLElement ? prevHostElement : nextHTMLElement,
    );
  });

  const { canInjectIntoChild } = useBorderBeamInjection({
    validationStyleVar: varName('beam-size'),
    children,
    hostElement,
  });
  const { beamVisible, trackRadius } = useBorderBeamGeometry({
    prefixCls,
    hostElement,
    canInjectIntoChild,
  });

  // ============================ Motion Path Radius ============================
  const motionPathRadius = getMotionPathRadius(trackRadius, DEFAULT_MOTION_PATH_RADIUS);

  // ============================ Styles ============================
  const getRootStyle = (originStyle?: React.CSSProperties): React.CSSProperties => {
    const nextRootStyle: React.CSSProperties = {
      ...originStyle,
      [varName('beam-gradient')]: mergedBeamGradient, // Visible beam gradient.
      [varName('beam-delay')]: `${DEFAULT_BEAM_DELAY}s`, // Animation delay.
      [varName('beam-duration')]: `${DEFAULT_BEAM_DURATION}s`, // Full loop duration.
      [varName('beam-offset-end')]: `${DEFAULT_BEAM_OFFSET_END}%`, // End offset on the path.
      [varName('beam-offset-start')]: `${DEFAULT_BEAM_OFFSET_START}%`, // Start offset on the path.
      [varName('beam-anchor')]: DEFAULT_BEAM_ANCHOR, // Beam anchor point on the path.
      [varName('beam-clip-radius')]: trackRadius, // Visible ring radius from the measured target.
      [varName('beam-path-radius')]: motionPathRadius, // Smoothed radius used by motion path.
      [varName('beam-size')]: `${DEFAULT_BEAM_SIZE}px`, // Beam length.
      [varName('border-width')]: `${mergedBorderWidth}px`, // Ring width.
      ...contextStyle,
      ...style,
    };

    return nextRootStyle;
  };

  const beamStyle = React.useMemo(() => {
    const nextBeamStyle: React.CSSProperties = {};

    if (!beamVisible || mergedBorderWidth <= 0) {
      nextBeamStyle.display = 'none';
    }

    return nextBeamStyle;
  }, [beamVisible, mergedBorderWidth]);

  const beamCls = `${prefixCls}-beam`;

  const effectInfo = React.useMemo(
    () => ({ className: beamCls, style: beamStyle }),
    [beamCls, beamStyle],
  );

  useBorderBeamEffect({
    prefixCls,
    effectInfo,
    hostElement: canInjectIntoChild ? hostElement : null,
  });

  // ============================ Render ============================
  if (!canInjectIntoChild) {
    return (
      <div
        ref={setHostNode}
        className={clsx(rootClsName, `${prefixCls}-wrapper`)}
        style={getRootStyle()}
      >
        {children}
        <div aria-hidden="true" className={beamCls} style={beamStyle} />
      </div>
    );
  }

  // Follow Wave's holder pattern in direct mode: merge className/style/ref into the child
  // first, then insert the holder into the real DOM in a layout effect.
  const mergedChild = cloneElement(children, (originProps) => ({
    ref: composeRef(getNodeRef(children), setHostNode),
    className: clsx(originProps.className, rootClsName),
    style: getRootStyle(originProps.style),
  }));

  return mergedChild;
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
