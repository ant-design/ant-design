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

// ============================ Color ============================

// Build the beam gradient from a solid color or explicit gradient stops.
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
    // Normalize custom gradient stops so CSS output stays deterministic.
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

// ============================ Radius Config ============================

// Normalize a radius value into a CSS length string when possible.
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

// Pick the first explicitly configured radius from merged style sources.
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

// ============================ Radius Parse ============================

// Split the two-axis radius syntax without breaking function contents.
const splitByTopLevelSlash = (value: string): string[] => {
  const groups: string[] = [];
  let currentGroup = '';
  let depth = 0;

  for (const char of value) {
    if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth = Math.max(depth - 1, 0);
    }

    // Only treat `/` as the horizontal/vertical radius separator at top level.
    if (char === '/' && depth === 0) {
      groups.push(currentGroup.trim());
      currentGroup = '';
      continue;
    }

    currentGroup += char;
  }

  groups.push(currentGroup.trim());

  return groups;
};

// Split radius tokens while preserving whitespace inside CSS functions.
const splitByTopLevelWhitespace = (value: string): string[] => {
  const tokens: string[] = [];
  let currentToken = '';
  let depth = 0;

  // Push the current token only when it contains meaningful content.
  const flushCurrentToken = () => {
    const trimmedToken = currentToken.trim();

    if (trimmedToken) {
      tokens.push(trimmedToken);
    }

    currentToken = '';
  };

  for (const char of value) {
    if (char === '(') {
      depth += 1;
      currentToken += char;
      continue;
    }

    if (char === ')') {
      depth = Math.max(depth - 1, 0);
      currentToken += char;
      continue;
    }

    // Keep spaces inside CSS functions like `calc(100% / 2)` untouched.
    if (/\s/.test(char) && depth === 0) {
      flushCurrentToken();
      continue;
    }

    currentToken += char;
  }

  flushCurrentToken();

  return tokens;
};

// Expand CSS radius shorthand into the four-corner order.
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

// Compress four-corner radius values back to the shortest valid shorthand.
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

// Parse one computed corner radius into horizontal and vertical parts.
export const parseRadiusCorner = (value: string): RadiusCorner | undefined => {
  const tokens = splitByTopLevelWhitespace(value.trim());

  switch (tokens.length) {
    case 1:
      return [tokens[0], tokens[0]];
    case 2:
      return [tokens[0], tokens[1]];
    default:
      return undefined;
  }
};

// Parse any supported border-radius value into explicit horizontal/vertical models.
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
      // `border-radius` can be `horizontal / vertical`, so split the two axes first.
      const radiusGroups = splitByTopLevelSlash(trimmedValue);

      if (radiusGroups.length > 2 || radiusGroups.some((group) => !group)) {
        return undefined;
      }

      const horizontal = expandRadiusTokens(splitByTopLevelWhitespace(radiusGroups[0]));
      const vertical = radiusGroups[1]
        ? expandRadiusTokens(splitByTopLevelWhitespace(radiusGroups[1]))
        : horizontal;

      if (!horizontal || !vertical) {
        return undefined;
      }

      return { horizontal, vertical };
    }
  }

  return undefined;
};

// Format the normalized radius model back into a CSS border-radius string.
export const formatRadiusValue = ({ horizontal, vertical }: RadiusModel): string => {
  const horizontalValue = compactRadiusTokens(horizontal).join(' ');
  const verticalValue = compactRadiusTokens(vertical).join(' ');

  if (horizontalValue === verticalValue) {
    return horizontalValue;
  }

  return `${horizontalValue} / ${verticalValue}`;
};

// ============================ Radius Motion ============================

// Reconstruct the child radius from computed corner values.
export const getComputedRadius = (style: CSSStyleDeclaration): string | undefined => {
  // Prefer the four computed corner values so non-uniform radius stays explicit.
  const topLeft = parseRadiusCorner(style.borderTopLeftRadius);
  const topRight = parseRadiusCorner(style.borderTopRightRadius);
  const bottomRight = parseRadiusCorner(style.borderBottomRightRadius);
  const bottomLeft = parseRadiusCorner(style.borderBottomLeftRadius);

  if (!topLeft || !topRight || !bottomRight || !bottomLeft) {
    // Fall back to the shorthand only when the longhands are unavailable.
    const fallbackRadius = parseRadiusValue(style.borderRadius);

    return fallbackRadius ? formatRadiusValue(fallbackRadius) : undefined;
  }

  return formatRadiusValue({
    horizontal: [topLeft[0], topRight[0], bottomRight[0], bottomLeft[0]],
    vertical: [topLeft[1], topRight[1], bottomRight[1], bottomLeft[1]],
  });
};

// Read a numeric radius token that can participate in motion smoothing math.
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

// Apply the same token mapping to each corner in the radius model.
const mapRadiusSequence = (
  sequence: RadiusSequence,
  mapToken: (token: string) => string,
): RadiusSequence => [
  mapToken(sequence[0]),
  mapToken(sequence[1]),
  mapToken(sequence[2]),
  mapToken(sequence[3]),
];

// Apply internal smoothing to the visual motion path radius when needed.
export const getMotionPathRadius = (
  value: CSSProperties['borderRadius'] | undefined,
  minMotionRadius: number,
): string | undefined => {
  const radiusModel = parseRadiusValue(value);

  if (!radiusModel) {
    return undefined;
  }

  // Clamp each numeric radius token while preserving non-numeric CSS expressions.
  const createNormalizedModel = (minimumRadius: number) => {
    const normalizeToken = (token: string) => {
      const tokenValue = getRadiusTokenValue(token);

      if (tokenValue === undefined) {
        return token;
      }

      // Clamp numeric radius tokens so the beam does not kink too sharply at corners.
      return `${Math.max(tokenValue, minimumRadius)}px`;
    };

    return {
      horizontal: mapRadiusSequence(radiusModel.horizontal, normalizeToken),
      vertical: mapRadiusSequence(radiusModel.vertical, normalizeToken),
    };
  };

  return formatRadiusValue(createNormalizedModel(minMotionRadius));
};
