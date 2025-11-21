import * as React from 'react';
import { FastColor } from '@ant-design/fast-color';

import type { TagProps } from '..';
import { isPresetColor, isPresetStatusColor } from '../../_util/colors';

/**
 * Convert color related props to a unified object,
 * which is used to flatten the compatibility requirements.
 */
export default function useColor(
  props: Pick<TagProps, 'color' | 'variant' | 'bordered'>,
  contextVariant?: TagProps['variant'],
) {
  const { color, variant, bordered } = props;

  return React.useMemo(() => {
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
      } else {
        const hsl = new FastColor(nextColor).toHsl();
        hsl.l = 0.95;
        tagStyle.backgroundColor = new FastColor(hsl).toHexString();
        tagStyle.color = color;

        if (nextVariant === 'outlined') {
          tagStyle.borderColor = color;
        }
      }
    }

    return [nextVariant, nextColor, nextIsPreset, nextIsStatus, tagStyle] as const;
  }, [color, variant, bordered, contextVariant]);
}
