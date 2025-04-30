import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { calc, componentCls, iconSize, lineHeight, iconSizeSM } = token;

  const itemCls = `${componentCls}-item`;

  return {
    // ==================== Horizontal ====================
    [`${componentCls}-label-horizontal`]: {
      // Horizontal only
      [`&${componentCls}-horizontal`]: {
        [`${itemCls}:not(:first-child)`]: {
          marginInlineStart: token.margin,
        },

        [itemCls]: {
          columnGap: token.marginXS,

          '&:last-child': {
            flex: '0 1 auto',
          },
        },
      },

      // Vertical only
      [`&${componentCls}-vertical`]: {
        [itemCls]: {
          columnGap: token.margin,
        },
      },

      // Shared
      [`${itemCls}-section`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${itemCls}-header`]: {
        height: iconSize,
      },

      [`${itemCls}-title`]: {
        flex: '0 1 auto',
      },

      [`${itemCls}-subtitle`]: {
        flex: '0 9999 auto',
      },

      [`&${componentCls}-horizontal ${itemCls}-rail`]: {
        flex: 1,
        marginInlineStart: token.margin,
      },
    },

    // ===================== Vertical =====================
    [`${componentCls}-label-vertical`]: {
      [itemCls]: {
        flexDirection: 'column',
        rowGap: token.paddingSM,
        alignItems: 'center',
        flex: 1,
      },

      // Section
      [`${itemCls}-section`]: {
        alignSelf: 'stretch',
      },

      // Header
      [`${itemCls}-header`]: {
        flexDirection: 'column',
        alignItems: 'center',
      },

      // >>> title & subtitle & description
      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-description`]: {
        textAlign: 'center',
        maxWidth: '100%',
      },

      // >>> rail
      [`${itemCls}-rail`]: {
        position: 'absolute',
        top: 0,
        width: calc('100%').sub(iconSize).sub(calc(token.marginXXS).mul(2).equal()).equal(),
        insetInlineStart: calc('50%')
          .add(calc(iconSize).div(2).equal())
          .add(token.marginXXS)
          .equal(),
      },
    },
  };
};
export default genLabelPlacementStyle;
