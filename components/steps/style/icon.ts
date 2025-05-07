import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genIconStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, customIconTop, customIconSize, customIconFontSize, motionDurationSlow } =
    token;

  const itemCls = `${componentCls}-item`;

  return {
    [componentCls]: {
      [`${itemCls}-icon`]: {
        width: token.iconSize,
        height: token.iconSize,
        margin: 0,
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: token.iconFontSize,
        fontFamily: token.fontFamily,
        lineHeight: unit(token.iconSize),
        textAlign: 'center',
        borderRadius: token.iconSize,
        border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
        transition: ['background', 'border', 'color']
          .map((key) => `${key} ${motionDurationSlow}`)
          .join(', '),
      },

      // Only adjust horizontal customize icon width
      // [`&:not(${componentCls}-vertical)`]: {
      //   [`${itemCls}-custom`]: {
      //     [`${itemCls}-icon`]: {
      //       width: 'auto',
      //       background: 'none',
      //     },
      //   },
      // },

      // ==================== Custom ====================
      [`${itemCls}-custom ${itemCls}-icon`]: {
        height: 'auto',
        background: 'none',
        border: 0,
        // [`> ${componentCls}-icon`]: {
        //   top: customIconTop,
        //   width: customIconSize,
        //   height: customIconSize,
        fontSize: customIconFontSize,
        //   lineHeight: unit(customIconSize),
        // },
      },
    },
  };
};

export default genIconStyle;
