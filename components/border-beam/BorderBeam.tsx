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
import { getComputedRadius, getDefinedRadius, getMotionPathRadius, toCSSLength } from './util';

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
  colorFrom?: string;
  colorTo?: string;
  pathRadius?: React.CSSProperties['borderRadius'];
  styles?: BorderBeamSemanticAllType['stylesAndFn'];
}

const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];

const DEFAULT_BEAM_DURATION = 6;
const DEFAULT_BEAM_DELAY = 0;
const DEFAULT_BEAM_OFFSET_START = 0;
const DEFAULT_BEAM_OFFSET_END = 100;
const DEFAULT_BEAM_SIZE = 60;
const DEFAULT_BEAM_ANCHOR = '90%';
const ROOT_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
  attributes: true,
  attributeFilter: ['class', 'style'],
};
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
    colorFrom,
    colorTo,
    pathRadius,
    styles,
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('borderBeam');

  const prefixCls = getPrefixCls('border-beam', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const mergedBorderWidth = token.BorderBeam?.borderBeamWidth ?? token.lineWidth;
  const mergedColorFrom = colorFrom ?? token.BorderBeam?.beamColorFrom ?? token.colorPrimary;
  const mergedColorTo = colorTo ?? token.BorderBeam?.beamColorTo ?? token.colorPrimaryHover;

  const mergedProps: BorderBeamProps = {
    ...props,
    colorFrom: mergedColorFrom,
    colorTo: mergedColorTo,
    pathRadius,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, classNames],
    [contextStyles, styles],
    {
      props: mergedProps,
    },
  );
  const { borderRadius: semanticBorderRadius, ...restMergedRootStyles } = mergedStyles.root ?? {};
  const { borderRadius: contextBorderRadius, ...restContextStyle } = contextStyle ?? {};
  const { borderRadius: styleBorderRadius, ...restStyle } = style ?? {};
  const explicitPathRadius = getDefinedRadius(
    pathRadius,
    styleBorderRadius,
    contextBorderRadius,
    semanticBorderRadius,
  );
  const configuredTrackRadius = toCSSLength(explicitPathRadius, '0px');
  const needMeasureChildRadius = explicitPathRadius === undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [observedChildElement, setObservedChildElement] = React.useState<HTMLElement>();
  const [measuredChildRadius, setMeasuredChildRadius] = React.useState<string>();

  const syncMeasuredChildRadius = useEvent(() => {
    const childElement = Array.from(rootRef.current?.children ?? []).find(
      (node) => !node.classList.contains(`${prefixCls}-beam`),
    ) as HTMLElement | undefined;

    setObservedChildElement((prevChildElement) =>
      prevChildElement === childElement ? prevChildElement : childElement,
    );

    const nextChildRadius = childElement
      ? getComputedRadius(window.getComputedStyle(childElement))
      : undefined;

    setMeasuredChildRadius((prevRadius) => {
      if (prevRadius === nextChildRadius) {
        return prevRadius;
      }

      return nextChildRadius;
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
  }, [needMeasureChildRadius, syncMeasuredChildRadius]);

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
    needMeasureChildRadius && rootRef.current ? rootRef.current : EMPTY_MUTATION_TARGETS;
  const childMutationTarget =
    needMeasureChildRadius && observedChildElement ? observedChildElement : EMPTY_MUTATION_TARGETS;

  useMutateObserver(rootMutationTarget, onChildMutate, ROOT_MUTATION_OBSERVER_OPTIONS);
  useMutateObserver(childMutationTarget, onChildMutate, CHILD_MUTATION_OBSERVER_OPTIONS);

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || !observedChildElement || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(scheduleMeasuredChildRadiusSync);
    resizeObserver.observe(observedChildElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [needMeasureChildRadius, observedChildElement, scheduleMeasuredChildRadiusSync]);

  const trackRadius = needMeasureChildRadius
    ? measuredChildRadius || configuredTrackRadius
    : configuredTrackRadius;
  const motionPathRadius = getMotionPathRadius(trackRadius, DEFAULT_BEAM_SIZE) ?? trackRadius;

  const rootPrefixCls = getPrefixCls();
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

  const rootStyle: React.CSSProperties = {
    [varName('beam-color-from')]: mergedColorFrom,
    [varName('beam-color-to')]: mergedColorTo,
    [varName('beam-delay')]: `${DEFAULT_BEAM_DELAY}s`,
    [varName('beam-duration')]: `${DEFAULT_BEAM_DURATION}s`,
    [varName('beam-offset-end')]: `${DEFAULT_BEAM_OFFSET_END}%`,
    [varName('beam-offset-start')]: `${DEFAULT_BEAM_OFFSET_START}%`,
    [varName('beam-anchor')]: DEFAULT_BEAM_ANCHOR,
    [varName('beam-clip-radius')]: trackRadius,
    [varName('beam-path-radius')]: motionPathRadius,
    [varName('beam-size')]: `${DEFAULT_BEAM_SIZE}px`,
    [varName('border-width')]: `${mergedBorderWidth}px`,
    ...restMergedRootStyles,
    ...restContextStyle,
    ...restStyle,
  };

  return (
    <div
      ref={rootRef}
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
