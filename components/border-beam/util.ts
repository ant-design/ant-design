import type { CSSProperties } from 'react';

import { isNumber } from '../_util/is';

export type RadiusCorner = readonly [string, string];
export type RadiusSequence = readonly [string, string, string, string];
export type RadiusModel = {
  horizontal: RadiusSequence;
  vertical: RadiusSequence;
};
type BorderBeamGradientItem = {
  color: string;
  percent: number;
};
export type BorderBeamGradient = BorderBeamGradientItem[];
export type BorderBeamColor = string | BorderBeamGradient;

export const toCSSLength = (
  value: CSSProperties['borderRadius'] | undefined,
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

export const getDefinedRadius = (
  ...values: Array<CSSProperties['borderRadius'] | undefined>
): CSSProperties['borderRadius'] | undefined => {
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

export const getBorderBeamGradient = (
  value: BorderBeamColor | undefined,
  fallbackStartColor: string,
  fallbackEndColor: string,
) => {
  const fallbackGradient = `linear-gradient(to left, ${fallbackStartColor}, ${fallbackEndColor}, transparent)`;

  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      return `linear-gradient(to left, ${trimmedValue}, ${trimmedValue}, transparent)`;
    }

    return fallbackGradient;
  }

  if (Array.isArray(value)) {
    const normalizedStops = value
      .filter(
        (item): item is BorderBeamGradient[number] =>
          typeof item?.color === 'string' && item.color.trim().length > 0 && isNumber(item.percent),
      )
      .map((item) => ({
        color: item.color.trim(),
        percent: Math.min(Math.max(item.percent, 0), 100),
      }))
      .sort((prev, next) => prev.percent - next.percent);

    if (normalizedStops.length) {
      const colorStops = normalizedStops.map((item) => `${item.color} ${item.percent}%`).join(', ');

      return `linear-gradient(to left, ${colorStops}, transparent)`;
    }
  }

  return fallbackGradient;
};

export const getRadiusTokenValue = (token: string): number | undefined => {
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

export const expandRadiusTokens = (tokens: string[]): RadiusSequence | undefined => {
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

export const compactRadiusTokens = (tokens: RadiusSequence): string[] => {
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

export const parseRadiusCorner = (value: string): RadiusCorner | undefined => {
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

export const parseRadiusValue = (
  value: CSSProperties['borderRadius'] | undefined,
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

export const formatRadiusValue = ({ horizontal, vertical }: RadiusModel): string => {
  const horizontalValue = compactRadiusTokens(horizontal).join(' ');
  const verticalValue = compactRadiusTokens(vertical).join(' ');

  if (horizontalValue === verticalValue) {
    return horizontalValue;
  }

  return `${horizontalValue} / ${verticalValue}`;
};

export const getComputedRadius = (style: CSSStyleDeclaration): string | undefined => {
  const topLeft = parseRadiusCorner(style.borderTopLeftRadius);
  const topRight = parseRadiusCorner(style.borderTopRightRadius);
  const bottomRight = parseRadiusCorner(style.borderBottomRightRadius);
  const bottomLeft = parseRadiusCorner(style.borderBottomLeftRadius);

  if (!topLeft || !topRight || !bottomRight || !bottomLeft) {
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

export const getMotionPathRadius = (
  value: CSSProperties['borderRadius'] | undefined,
  minMotionRadius: number,
): string | undefined => {
  const radiusModel = parseRadiusValue(value);

  if (!radiusModel) {
    return undefined;
  }

  const createNormalizedModel = (minimumRadius: number) => {
    const normalizeToken = (token: string) => {
      const tokenValue = getRadiusTokenValue(token);

      if (tokenValue === undefined) {
        return token;
      }

      return `${Math.max(tokenValue, minimumRadius)}px`;
    };

    return {
      horizontal: mapRadiusSequence(radiusModel.horizontal, normalizeToken),
      vertical: mapRadiusSequence(radiusModel.vertical, normalizeToken),
    };
  };

  return formatRadiusValue(createNormalizedModel(minMotionRadius));
};
