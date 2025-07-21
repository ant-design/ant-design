import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genIconStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, customIconFontSize, motionDurationSlow } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: {
      '--steps-icon-size': token.iconSize,
      '--steps-icon-border-width': token.lineWidth,

      [`${itemCls}-icon`]: {
        width: 'var(--steps-icon-size)',
        height: 'var(--steps-icon-size)',
        margin: 0,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: token.iconFontSize,
        fontFamily: token.fontFamily,
        lineHeight: 'var(--steps-icon-size)',
        textAlign: 'center',
        borderRadius: 'var(--steps-icon-size)',
        border: `var(--steps-icon-border-width) ${token.lineType} transparent`,
        transition: ['background', 'border', 'color', 'inset', 'transform']
          .map((key) => `${key} ${motionDurationSlow}`)
          .join(', '),
        zIndex: 1,
      },

      // ==================== Custom ====================
      [`${itemCls}-custom ${itemCls}-icon`]: {
        background: 'none',
        border: 0,
        fontSize: customIconFontSize,
      },
    },
  };
};

export default genIconStyle;
