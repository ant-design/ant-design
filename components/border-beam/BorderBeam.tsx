import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import { useMergeSemantic } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { isNumber } from '../_util/is';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
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

type RadiusCorner = readonly [string, string];
type RadiusSequence = readonly [string, string, string, string];
type RadiusModel = {
  horizontal: RadiusSequence;
  vertical: RadiusSequence;
};

const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];

const getRadiusTokenValue = (token: string): number | undefined => {
  const normalizedToken = token.trim().toLowerCase();

  if (!normalizedToken) {
    return undefined;
  }

  const plainNumber = Number(normalizedToken);

  if (Number.isFinite(plainNumber)) {
    return plainNumber;
  }

  if (normalizedToken.endsWith('px')) {
    const pxValue = Number(normalizedToken.slice(0, -2));

    if (Number.isFinite(pxValue)) {
      return pxValue;
    }
  }

  return undefined;
};

const expandRadiusTokens = (tokens: string[]): RadiusSequence | undefined => {
  switch (tokens.length) {
    case 1:
      return [tokens[0], tokens[0], tokens[0], tokens[0]];
    case 2:
      return [tokens[0], tokens[1], tokens[0], tokens[1]];
    case 3:
      return [tokens[0], tokens[1], tokens[2], tokens[1]];
    case 4:
      return [tokens[0], tokens[1], tokens[2], tokens[3]];
    default:
      return undefined;
  }
};

const compactRadiusTokens = (tokens: RadiusSequence): string[] => {
  const [topLeft, topRight, bottomRight, bottomLeft] = tokens;

  if (topLeft === topRight && topLeft === bottomRight && topLeft === bottomLeft) {
    return [topLeft];
  }

  if (topLeft === bottomRight && topRight === bottomLeft) {
    return [topLeft, topRight];
  }

  if (topRight === bottomLeft) {
    return [topLeft, topRight, bottomRight];
  }

  return [topLeft, topRight, bottomRight, bottomLeft];
};

const parseRadiusCorner = (value: string): RadiusCorner | undefined => {
  const tokens = value.trim().split(/\s+/).filter(Boolean);

  switch (tokens.length) {
    case 1:
      return [tokens[0], tokens[0]];
    case 2:
      return [tokens[0], tokens[1]];
    default:
      return undefined;
  }
};

const parseRadiusValue = (
  value: React.CSSProperties['borderRadius'] | undefined,
): RadiusModel | undefined => {
  if (isNumber(value)) {
    const normalizedValue = `${value}px`;
    return {
      horizontal: [normalizedValue, normalizedValue, normalizedValue, normalizedValue],
      vertical: [normalizedValue, normalizedValue, normalizedValue, normalizedValue],
    };
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      const radiusGroups = trimmedValue.split('/').map((group) => group.trim());

      if (radiusGroups.length > 2 || radiusGroups.some((group) => !group)) {
        return undefined;
      }

      const horizontal = expandRadiusTokens(radiusGroups[0].split(/\s+/));
      const vertical = radiusGroups[1]
        ? expandRadiusTokens(radiusGroups[1].split(/\s+/))
        : horizontal;

      if (!horizontal || !vertical) {
        return undefined;
      }

      return { horizontal, vertical };
    }
  }

  return undefined;
};

const formatRadiusValue = ({ horizontal, vertical }: RadiusModel): string => {
  const horizontalValue = compactRadiusTokens(horizontal).join(' ');
  const verticalValue = compactRadiusTokens(vertical).join(' ');

  if (horizontalValue === verticalValue) {
    return horizontalValue;
  }

  return `${horizontalValue} / ${verticalValue}`;
};

const getComputedRadius = (style: CSSStyleDeclaration): string | undefined => {
  const topLeft = parseRadiusCorner(style.borderTopLeftRadius);
  const topRight = parseRadiusCorner(style.borderTopRightRadius);
  const bottomRight = parseRadiusCorner(style.borderBottomRightRadius);
  const bottomLeft = parseRadiusCorner(style.borderBottomLeftRadius);

  if (!topLeft || !topRight || !bottomRight || !bottomLeft) {
    // JSDOM may omit corner longhands even when the shorthand is available.
    const fallbackRadius = parseRadiusValue(style.borderRadius);

    return fallbackRadius ? formatRadiusValue(fallbackRadius) : undefined;
  }

  return formatRadiusValue({
    horizontal: [topLeft[0], topRight[0], bottomRight[0], bottomLeft[0]],
    vertical: [topLeft[1], topRight[1], bottomRight[1], bottomLeft[1]],
  });
};

const mapRadiusSequence = (
  sequence: RadiusSequence,
  mapToken: (token: string) => string,
): RadiusSequence => [
  mapToken(sequence[0]),
  mapToken(sequence[1]),
  mapToken(sequence[2]),
  mapToken(sequence[3]),
];

const getMotionPathRadius = (
  value: React.CSSProperties['borderRadius'] | undefined,
  minMotionRadius: number,
): string | undefined => {
  const radiusModel = parseRadiusValue(value);

  if (!radiusModel) {
    return undefined;
  }

  const createNormalizedModel = (minMotionRadius: number) => {
    const normalizeToken = (token: string) => {
      const tokenValue = getRadiusTokenValue(token);

      if (tokenValue === undefined) {
        return token;
      }

      return `${Math.max(tokenValue, minMotionRadius)}px`;
    };

    return {
      horizontal: mapRadiusSequence(radiusModel.horizontal, normalizeToken),
      vertical: mapRadiusSequence(radiusModel.vertical, normalizeToken),
    };
  };

  return formatRadiusValue(createNormalizedModel(minMotionRadius));
};

const DEFAULT_BEAM_DURATION = 6;
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
  const motionPathRadius = getMotionPathRadius(trackRadius, mergedSize) ?? trackRadius;

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
    [varName('beam-path-radius')]: motionPathRadius,
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
