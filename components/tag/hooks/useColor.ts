import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';

import type { TagProps } from '..';
import { isPresetColor, isPresetStatusColor } from '../../_util/colors';

/**
 * Convert color related props to a unified object,
 * which is used to flatten the compatibility requirements.
 */
export default function useColor(
  props: Pick<TagProps, 'color' | 'variant' | 'bordered' | 'autoContrast'>,
  contextVariant?: TagProps['variant'],
) {
  const { color, variant, bordered, autoContrast } = props;

  return React.useMemo(() => {
    const toLinear = (value: number) => {
      const channel = value / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    };

    const getRelativeLuminance = (inputColor: string) => {
      const { r, g, b } = new FastColor(inputColor).toRgb();
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const getContrastRatio = (leftColor: string, rightColor: string) => {
      const left = getRelativeLuminance(leftColor);
      const right = getRelativeLuminance(rightColor);
      const [lighter, darker] = left >= right ? [left, right] : [right, left];

      return (lighter + 0.05) / (darker + 0.05);
    };

    const getReadableColor = (bgColor: string, baseColor: string) => {
      const hsl = new FastColor(baseColor).toHsl();
      const candidates = [
        baseColor,
        new FastColor({ ...hsl, l: Math.max(0, hsl.l * 0.35) }).toHexString(),
        new FastColor({ ...hsl, l: Math.min(1, hsl.l + (1 - hsl.l) * 0.35) }).toHexString(),
        '#000000',
        '#ffffff',
      ];
      let bestColor = '#000000';
      let bestContrast = getContrastRatio(bgColor, bestColor);
      for (let index = 0; index < candidates.length; index += 1) {
        const current = candidates[index];
        const contrast = getContrastRatio(bgColor, current);
        if (contrast > bestContrast) {
          bestColor = current;
          bestContrast = contrast;
        }
      }
      return bestColor;
    };

    const getSolidReadableColor = (bgColor: string, baseColor: string) => {
      const hsl = new FastColor(baseColor).toHsl();
      const candidates = [
        new FastColor({ ...hsl, l: Math.max(0, hsl.l * 0.35) }).toHexString(),
        new FastColor({ ...hsl, l: Math.min(1, hsl.l + (1 - hsl.l) * 0.35) }).toHexString(),
        '#000000',
        '#ffffff',
      ];
      let bestColor = '';
      let bestDistance = 2;
      candidates.forEach((current) => {
        if (getContrastRatio(bgColor, current) >= 4.5) {
          const distance = Math.abs(new FastColor(current).toHsl().l - hsl.l);
          if (distance < bestDistance) {
            bestColor = current;
            bestDistance = distance;
          }
        }
      });

      return bestColor || getReadableColor(bgColor, baseColor);
    };

    const isInverseColor = color?.endsWith('-inverse');

    // =================== Variant ===================
    let nextVariant: TagProps['variant'];

    if (variant) {
      // `variant` first
      nextVariant = variant;
    } else if (isInverseColor) {
      // Fallback if using inverse color
      nextVariant = 'solid';
    } else if (bordered === false) {
      // Fallback if using filled
      nextVariant = 'filled';
    } else {
      // Finally not conflict, use context
      nextVariant = contextVariant || 'filled';
    }

    // ==================== Color ====================
    let nextColor = isInverseColor ? color?.replace('-inverse', '') : color;

    if (nextColor === undefined && nextVariant === 'solid') {
      nextColor = 'default';
    }

    // =============== Preset & Status ===============
    const nextIsPreset = isPresetColor(nextColor);
    const nextIsStatus = isPresetStatusColor(nextColor);

    // ================== Customize ==================
    // When `color` is not preset color,
    // dynamic calculate the color pair.
    const tagStyle: React.CSSProperties = {};

    if (!nextIsPreset && !nextIsStatus && nextColor) {
      if (nextVariant === 'solid') {
        tagStyle.backgroundColor = color;
        if (autoContrast) {
          tagStyle.color = getSolidReadableColor(nextColor, nextColor);
        }
      } else {
        const hsl = new FastColor(nextColor).toHsl();
        hsl.l = 0.95;
        const backgroundColor = new FastColor(hsl).toHexString();
        tagStyle.backgroundColor = backgroundColor;
        tagStyle.color = autoContrast ? getReadableColor(backgroundColor, nextColor) : color;

        if (nextVariant === 'outlined') {
          tagStyle.borderColor = color;
        }
      }
    }

    return [nextVariant, nextColor, nextIsPreset, nextIsStatus, tagStyle] as const;
  }, [color, variant, bordered, autoContrast, contextVariant]);
}
