import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isNumber } from '../_util/is';
import { useComponentConfig } from '../config-provider/context';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { useToken } from '../theme/internal';
import { genCssVar } from '../theme/util/genStyleUtils';
import useStyle from './style';

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
  rootClassName?: string;
  style?: React.CSSProperties;
  borderWidth?: number;
  children?: React.ReactNode;
  classNames?: BorderBeamSemanticAllType['classNamesAndFn'];
  color?: string;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  disabled?: boolean;
  duration?: number;
  offset?: number;
  pathRadius?: React.CSSProperties['borderRadius'];
  paused?: boolean;
  reverse?: boolean;
  size?: number;
  styles?: BorderBeamSemanticAllType['stylesAndFn'];
}

const getPositiveNumber = (value: number | undefined, fallback: number) => {
  if (!isNumber(value) || value < 0) {
    return fallback;
  }

  return value;
};

const getDuration = (value: number | undefined, fallback: number) => {
  if (!isNumber(value) || value <= 0) {
    return fallback;
  }

  return value;
};

const getNormalizedOffset = (value: number | undefined) => {
  if (!isNumber(value)) {
    return 0;
  }

  return ((value % 100) + 100) % 100;
};

const toCSSLength = (
  value: React.CSSProperties['borderRadius'] | undefined,
  fallback: string,
): string => {
  if (isNumber(value)) {
    return `${value}px`;
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return fallback;
};

const getDefinedRadius = (
  ...values: Array<React.CSSProperties['borderRadius'] | undefined>
): React.CSSProperties['borderRadius'] | undefined => {
  for (const value of values) {
    if (isNumber(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return undefined;
};

const getBeamPathRadius = (
  value: React.CSSProperties['borderRadius'] | undefined,
  beamSize: number,
  fallback: number,
): string => {
  // Ensure numeric corner radii are at least as large as the beam itself so the motion path
  // stays smooth through tight corners. Non-numeric CSS values are preserved as authored.
  const getNormalizedRadiusToken = (token: string) => {
    const match = token.match(/^(-?\d+(\.\d+)?)(px)?$/);

    if (!match) {
      return token;
    }

    return `${Math.max(Number.parseFloat(match[1]), beamSize)}px`;
  };

  if (isNumber(value)) {
    return `${Math.max(value, beamSize)}px`;
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      return trimmedValue
        .split('/')
        .map((group) => group.trim().split(/\s+/).map(getNormalizedRadiusToken).join(' '))
        .join(' / ');
    }
  }

  return `${Math.max(fallback, beamSize)}px`;
};

const DEFAULT_BEAM_DURATION = 6;
const DEFAULT_BEAM_SIZE = 60;
const DEFAULT_BEAM_ANCHOR = '90%';
const CHILD_LIST_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
};

const BorderBeam: React.FC<React.PropsWithChildren<BorderBeamProps>> = (props) => {
  const [, token] = useToken();
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    borderWidth,
    children,
    classNames,
    color,
    colorFrom,
    colorTo,
    delay,
    disabled = false,
    duration,
    offset,
    pathRadius,
    paused = false,
    reverse = false,
    size,
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
  const mergedBorderWidth = getPositiveNumber(
    borderWidth,
    token.BorderBeam?.borderBeamWidth ?? token.lineWidth,
  );
  const mergedDuration = getDuration(duration, DEFAULT_BEAM_DURATION);
  const mergedSize = getPositiveNumber(size, DEFAULT_BEAM_SIZE);
  const mergedDelay = isNumber(delay) ? delay : 0;
  const normalizedOffset = getNormalizedOffset(offset);
  const mergedColorFrom =
    colorFrom ?? color ?? token.BorderBeam?.beamColorFrom ?? token.colorPrimary;
  const mergedColorTo =
    colorTo ?? color ?? token.BorderBeam?.beamColorTo ?? token.colorPrimaryHover;
  const beamOffsetStart = reverse ? 100 - normalizedOffset : normalizedOffset;
  const beamOffsetEnd = reverse ? -normalizedOffset : 100 + normalizedOffset;

  const mergedProps: BorderBeamProps = {
    ...props,
    borderWidth: mergedBorderWidth,
    colorFrom: mergedColorFrom,
    colorTo: mergedColorTo,
    delay: mergedDelay,
    disabled,
    duration: mergedDuration,
    offset: normalizedOffset,
    pathRadius,
    paused,
    reverse,
    size: mergedSize,
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
  const configuredTrackRadius = toCSSLength(explicitPathRadius, `${token.borderRadius}px`);
  const needMeasureChildRadius = explicitPathRadius === undefined;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [observedChildElement, setObservedChildElement] = React.useState<HTMLElement>();
  const [measuredChildRadius, setMeasuredChildRadius] = React.useState<string>();

  const syncMeasuredChildRadius = useEvent(() => {
    // Only measure as a fallback when no explicit track radius is provided.
    const childElement = Array.from(rootRef.current?.children ?? []).find(
      (node) => !node.classList.contains(`${prefixCls}-beam`),
    ) as HTMLElement | undefined;

    setObservedChildElement((prevChildElement) =>
      prevChildElement === childElement ? prevChildElement : childElement,
    );

    const nextChildRadius = childElement
      ? window.getComputedStyle(childElement).borderRadius
      : undefined;

    setMeasuredChildRadius((prevRadius) => {
      if (prevRadius === nextChildRadius) {
        return prevRadius;
      }

      return nextChildRadius;
    });
  });

  useLayoutEffect(() => {
    if (!needMeasureChildRadius) {
      setObservedChildElement((prevChildElement) =>
        prevChildElement === undefined ? prevChildElement : undefined,
      );
      setMeasuredChildRadius((prevRadius) => (prevRadius === undefined ? prevRadius : undefined));
      return;
    }

    syncMeasuredChildRadius();
  }, [children, needMeasureChildRadius, syncMeasuredChildRadius]);

  const onChildMutate = useEvent(() => {
    syncMeasuredChildRadius();
  });

  const rootMutationTarget = needMeasureChildRadius && rootRef.current ? [rootRef.current] : [];
  const childMutationTarget =
    needMeasureChildRadius && observedChildElement ? [observedChildElement] : [];

  useMutateObserver(rootMutationTarget, onChildMutate, CHILD_LIST_OBSERVER_OPTIONS);
  useMutateObserver(childMutationTarget, onChildMutate);

  useLayoutEffect(() => {
    if (!needMeasureChildRadius || !observedChildElement || typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(syncMeasuredChildRadius);
    resizeObserver.observe(observedChildElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [needMeasureChildRadius, observedChildElement, syncMeasuredChildRadius]);

  const trackRadius = needMeasureChildRadius
    ? measuredChildRadius || configuredTrackRadius
    : configuredTrackRadius;
  // Keep the visible clip radius aligned with the real container shape, while allowing the
  // motion path radius to be smoothed independently to reduce corner stutter.
  const mergedBeamPathRadius = getBeamPathRadius(
    explicitPathRadius ?? measuredChildRadius,
    mergedSize,
    token.borderRadius,
  );

  const rootPrefixCls = getPrefixCls();
  const [varName] = genCssVar(rootPrefixCls, 'border-beam');

  const rootStyle: React.CSSProperties = {
    [varName('beam-color-from')]: mergedColorFrom,
    [varName('beam-color-to')]: mergedColorTo,
    [varName('beam-delay')]: `${mergedDelay}s`,
    [varName('beam-duration')]: `${mergedDuration}s`,
    [varName('beam-offset-end')]: `${beamOffsetEnd}%`,
    [varName('beam-offset-start')]: `${beamOffsetStart}%`,
    [varName('beam-anchor')]: DEFAULT_BEAM_ANCHOR,
    [varName('beam-clip-radius')]: trackRadius,
    [varName('beam-path-radius')]: mergedBeamPathRadius,
    [varName('beam-size')]: `${mergedSize}px`,
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
        rootClassName,
        className,
        contextClassName,
        mergedClassNames.root,
        hashId,
        cssVarCls,
        {
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-paused`]: paused,
          [`${prefixCls}-reverse`]: reverse,
        },
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
