import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genIconStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, customIconFontSize, motionDurationSlow } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: {
      '--icon-size': token.iconSize,

      [`${itemCls}-icon`]: {
        width: `var(--icon-size)`,
        height: `var(--icon-size)`,
        margin: 0,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: token.iconFontSize,
        fontFamily: token.fontFamily,
        lineHeight: `var(--icon-size)`,
        textAlign: 'center',
        borderRadius: `var(--icon-size)`,
        border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
        transition: ['background', 'border', 'color']
          .map((key) => `${key} ${motionDurationSlow}`)
          .join(', '),
      },

      // ==================== Custom ====================
      [`${itemCls}-custom ${itemCls}-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        fontSize: customIconFontSize,
      },
    },
  };
};

export default genIconStyle;
