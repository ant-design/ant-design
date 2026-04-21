import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import useStyle from './style';
import {
  getBorderBeamGradient,
  getComputedRadius,
  getDefinedRadius,
  getMotionPathRadius,
  hasRadiusValue,
  toCSSLength,
} from './util';
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

// Reuse a stable empty target when inferred radius tracking is disabled.
const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];

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

// Watch the wrapper for child replacement and class/style driven radius updates.
const ROOT_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
  attributes: true,
  attributeFilter: ['class', 'style'],
};
// Watch the inferred child for its own class/style driven radius updates.
const CHILD_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  attributes: true,
  attributeFilter: ['class', 'style'],
};

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
  const configuredTrackRadius = toCSSLength(configuredRadius, '0px');
  const needMeasureChildRadius = configuredRadius === undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [observedChildElement, setObservedChildElement] = React.useState<HTMLElement>();
  const [measuredChildRadius, setMeasuredChildRadius] = React.useState<string>();

  const setRootNode = useEvent((node: HTMLDivElement | null) => {
    rootRef.current = node;

    setRootElement((prevNode) => (prevNode === node ? prevNode : node));
  });

  // ========================= Radius Sync =========================
  const syncMeasuredChildRadius = useEvent(() => {
    const currentRootElement = rootRef.current;
    const childElement = Array.from(currentRootElement?.children ?? []).find(
      (node) => !node.classList.contains(`${prefixCls}-beam`),
    ) as HTMLElement | undefined;

    setObservedChildElement((prevChildElement) =>
      prevChildElement === childElement ? prevChildElement : childElement,
    );

    const rootRadius = currentRootElement
      ? getComputedRadius(window.getComputedStyle(currentRootElement))
      : undefined;
    const nextChildRadius = childElement
      ? getComputedRadius(window.getComputedStyle(childElement))
      : undefined;
    const nextMeasuredRadius = hasRadiusValue(rootRadius) ? rootRadius : nextChildRadius;

    setMeasuredChildRadius((prevRadius) => {
      if (prevRadius === nextMeasuredRadius) {
        return prevRadius;
      }

      return nextMeasuredRadius;
    });
  });
  const scheduleMeasuredChildRadiusSync = React.useMemo(
    () => throttleByAnimationFrame(syncMeasuredChildRadius),
    [syncMeasuredChildRadius],
  );

  useLayoutEffect(() => {
    if (!needMeasureChildRadius) {
      setObservedChildElement((prevChildElement) =>
        prevChildElement === undefined ? prevChildElement : undefined,
      );
      setMeasuredChildRadius((prevRadius) => (prevRadius === undefined ? prevRadius : undefined));
      return;
    }

    syncMeasuredChildRadius();
    scheduleMeasuredChildRadiusSync();
  }, [needMeasureChildRadius, scheduleMeasuredChildRadiusSync, syncMeasuredChildRadius]);

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || !rootElement) {
      return;
    }

    // Re-measure after the DOM commit so late-mounted children do not miss the initial sync window.
    syncMeasuredChildRadius();
    // Retry on the next frame to avoid reading computed radius before class-based styles finish applying.
    scheduleMeasuredChildRadiusSync();
  }, [
    children,
    needMeasureChildRadius,
    rootElement,
    scheduleMeasuredChildRadiusSync,
    syncMeasuredChildRadius,
  ]);

  const onChildMutate = useEvent(() => {
    scheduleMeasuredChildRadiusSync();
  });

  useLayoutEffect(
    () => () => {
      scheduleMeasuredChildRadiusSync.cancel();
    },
    [scheduleMeasuredChildRadiusSync],
  );

  const rootMutationTarget =
    needMeasureChildRadius && rootElement ? rootElement : EMPTY_MUTATION_TARGETS;
  const childMutationTarget =
    needMeasureChildRadius && observedChildElement ? observedChildElement : EMPTY_MUTATION_TARGETS;

  useMutateObserver(rootMutationTarget, onChildMutate, ROOT_MUTATION_OBSERVER_OPTIONS);
  useMutateObserver(childMutationTarget, onChildMutate, CHILD_MUTATION_OBSERVER_OPTIONS);

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(scheduleMeasuredChildRadiusSync);

    if (rootElement) {
      resizeObserver.observe(rootElement);
    }

    if (observedChildElement && observedChildElement !== rootElement) {
      resizeObserver.observe(observedChildElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [needMeasureChildRadius, observedChildElement, rootElement, scheduleMeasuredChildRadiusSync]);

  const trackRadius = needMeasureChildRadius
    ? measuredChildRadius || configuredTrackRadius
    : configuredTrackRadius;
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
        style={{
          ...mergedStyles.beam,
          opacity: mergedBorderWidth > 0 ? mergedStyles.beam?.opacity : 0,
        }}
      />
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BorderBeam.displayName = 'BorderBeam';
}

export default BorderBeam;
