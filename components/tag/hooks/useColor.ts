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
    const getRelativeLuminance = (inputColor: string) => {
      const { r, g, b } = new FastColor(inputColor).toRgb();
      const [sr, sg, sb] = [r, g, b].map((value) => {
        const channel = value / 255;
        return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });

      return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
    };

    const getContrastRatio = (leftColor: string, rightColor: string) => {
      const left = getRelativeLuminance(leftColor);
      const right = getRelativeLuminance(rightColor);
      const [lighter, darker] = left >= right ? [left, right] : [right, left];

      return (lighter + 0.05) / (darker + 0.05);
    };

    const getReadableColor = (bgColor: string, baseColor: string) => {
      const hsl = new FastColor(baseColor).toHsl();
      const darker = new FastColor({
        ...hsl,
        l: Math.max(0, hsl.l * 0.35),
      }).toHexString();
      const lighter = new FastColor({
        ...hsl,
        l: Math.min(1, hsl.l + (1 - hsl.l) * 0.35),
      }).toHexString();
      const candidates = [baseColor, darker, lighter, '#000000', '#ffffff'];
      const uniqueCandidates = [...new Set(candidates)];

      return uniqueCandidates.reduce(
        (best, current) => {
          const contrast = getContrastRatio(bgColor, current);
          if (contrast > best.contrast) {
            return { color: current, contrast };
          }
          return best;
        },
        { color: '#000000', contrast: getContrastRatio(bgColor, '#000000') },
      ).color;
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
    const nextColor = isInverseColor ? color?.replace('-inverse', '') : color;

    // =============== Preset & Status ===============
    const nextIsPreset = isPresetColor(color);
    const nextIsStatus = isPresetStatusColor(color);

    // ================== Customize ==================
    // When `color` is not preset color,
    // dynamic calculate the color pair.
    const tagStyle: React.CSSProperties = {};

    if (!nextIsPreset && !nextIsStatus && nextColor) {
      if (nextVariant === 'solid') {
        tagStyle.backgroundColor = color;
        if (autoContrast) {
          tagStyle.color = getReadableColor(nextColor, nextColor);
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
