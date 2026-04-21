import React from 'react';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import useBorderBeamRadius from './hooks/useBorderBeamRadius';
import useStyle from './style';
import { getBorderBeamGradient, getDefinedRadius, getMotionPathRadius } from './util';
import type { BorderBeamColor } from './util';

export type { BorderBeamColor, BorderBeamGradient } from './util';

export type BorderBeamSemanticType = {
  classNames?: {
    root?: string;
    beam?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    beam?: React.CSSProperties;
  };
};

export type BorderBeamSemanticAllType = GenerateSemantic<BorderBeamSemanticType, BorderBeamProps>;

export interface BorderBeamProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  classNames?: BorderBeamSemanticAllType['classNamesAndFn'];
  color?: BorderBeamColor;
  styles?: BorderBeamSemanticAllType['stylesAndFn'];
}

// Default motion values written to CSS custom properties.
const DEFAULT_BEAM_DURATION = 6;
const DEFAULT_BEAM_DELAY = 0;
const DEFAULT_BEAM_OFFSET_START = 0;
const DEFAULT_BEAM_OFFSET_END = 100;
const DEFAULT_BEAM_SIZE = 100;
// Use a larger motion radius so the beam turns more continuously around corners.
const DEFAULT_MOTION_PATH_RADIUS = DEFAULT_BEAM_SIZE * 2;
// Keep the beam head slightly ahead on the path so the tail remains visible.
const DEFAULT_BEAM_ANCHOR = '90%';

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const [, token] = useToken();
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    classNames,
    color,
    styles,
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
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

  // =========== Merged Props for Semantic ===========
  const mergedProps: BorderBeamProps = {
    ...props,
    color,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );

  // ============================ Radius ============================
  const { borderRadius: semanticBorderRadius, ...restMergedRootStyles } = mergedStyles.root ?? {};
  const { borderRadius: contextBorderRadius, ...restContextStyle } = contextStyle ?? {};
  const { borderRadius: styleBorderRadius, ...restStyle } = style ?? {};
  const configuredRadius = getDefinedRadius(
    styleBorderRadius,
    contextBorderRadius,
    semanticBorderRadius,
  );
  const { beamVisible, setRootNode, trackRadius } = useBorderBeamRadius({
    prefixCls,
    configuredRadius,
    children,
  });
  const motionPathRadius =
    getMotionPathRadius(trackRadius, DEFAULT_MOTION_PATH_RADIUS) ?? trackRadius;

  // ============================ Styles ============================
  const rootStyle: React.CSSProperties = {
    [varName('beam-gradient')]: mergedBeamGradient, // Beam gradient colors.
    [varName('beam-delay')]: `${DEFAULT_BEAM_DELAY}s`, // Animation start delay.
    [varName('beam-duration')]: `${DEFAULT_BEAM_DURATION}s`, // Duration for one full loop.
    [varName('beam-offset-end')]: `${DEFAULT_BEAM_OFFSET_END}%`, // Motion path end offset.
    [varName('beam-offset-start')]: `${DEFAULT_BEAM_OFFSET_START}%`, // Motion path start offset.
    [varName('beam-anchor')]: DEFAULT_BEAM_ANCHOR, // Anchor point used to hang the beam on the path.
    [varName('beam-clip-radius')]: trackRadius, // Visible border ring radius.
    [varName('beam-path-radius')]: motionPathRadius, // Smoothed radius used by the motion path.
    [varName('beam-size')]: `${DEFAULT_BEAM_SIZE}px`, // Beam length / size.
    [varName('border-width')]: `${mergedBorderWidth}px`, // Border ring thickness.
    ...restMergedRootStyles,
    ...restContextStyle,
    ...restStyle,
  };
  const beamStyle: React.CSSProperties = {
    ...mergedStyles.beam,
  };

  if (!beamVisible || mergedBorderWidth <= 0) {
    beamStyle.display = 'none';
  }

  // ============================ Render ============================
  return (
    <div
      ref={setRootNode}
      className={clsx(
        prefixCls,
        className,
        contextClassName,
        mergedClassNames.root,
        hashId,
        cssVarCls,
      )}
      style={rootStyle}
    >
      {children}
      <div
        aria-hidden="true"
        className={clsx(`${prefixCls}-beam`, mergedClassNames.beam)}
        style={beamStyle}
      />
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
