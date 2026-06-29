import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import type { AliasToken, TokenWithCommonCls } from '../../theme/internal';
import { initMotion } from './motion';

export const fadeIn = new Keyframes('antFadeIn', {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const fadeOut = new Keyframes('antFadeOut', {
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

/**
 * Initialize fade motion styles
 *
 * Generates CSS styles for fade in/out transition animations when elements are shown/hidden.
 * Supports enter, appear, and leave animation states.
 *
 * @param token - Object containing design tokens and CSS class prefix
 * @param sameLevel - Controls CSS selector nesting behavior:
 *   - `false` (default): Generates descendant selectors like `.ant-fade-enter`, `.ant-fade-appear`
 *   - `true`: Generates same-level selectors with `&` prefix like `&.ant-fade-enter`, `&.ant-fade-appear`
 *   Use `true` when the motion classes are applied to the same element as the parent selector,
 *   Use `false` when the motion classes are applied to child elements
 * @returns CSS interpolation object containing fade motion styles
 *
 * @example
 * ```ts
 * // For child elements (default behavior)
 * const fadeStyles = initFadeMotion(token);
 * // Generates: .parent .ant-fade-enter { ... }
 *
 * // For same element
 * const sameLevelFadeStyles = initFadeMotion(token, true);
 * // Generates: .parent.ant-fade-enter { ... }
 * ```
 */
export const initFadeMotion = (
  token: TokenWithCommonCls<AliasToken>,
  sameLevel = false,
): CSSInterpolation => {
  const { antCls } = token;
  const motionCls = `${antCls}-fade`;
  const sameLevelPrefix = sameLevel ? '&' : '';

  return [
    initMotion(motionCls, fadeIn, fadeOut, token.motionDurationMid, sameLevel),
    {
      [`
        ${sameLevelPrefix}${motionCls}-enter,
        ${sameLevelPrefix}${motionCls}-appear
      `]: {
        opacity: 0,
        animationTimingFunction: 'linear',
      },

      [`${sameLevelPrefix}${motionCls}-leave`]: {
        animationTimingFunction: 'linear',
      },
    },
  ];
};
