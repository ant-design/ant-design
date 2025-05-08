import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { calc, componentCls, iconSize, descriptionMaxWidth, marginXS } = token;

  const itemCls = `${componentCls}-item`;

  return {
    // ==================== Horizontal ====================
    [`${componentCls}-label-horizontal`]: {
      // Horizontal only
      [`&${componentCls}-horizontal`]: {
        [`${itemCls}:not(:first-child)`]: {
          marginInlineStart: token.margin,
        },

        [`${itemCls}:last-child`]: {
          flex: '0 1 auto',
        },

        [`${itemCls}-wrapper`]: {
          columnGap: token.marginXS,
        },
      },

      // Vertical only
      [`&${componentCls}-vertical`]: {
        [`${itemCls}-wrapper`]: {
          columnGap: token.margin,
        },
      },

      // Shared
      [`${itemCls}-section`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${itemCls}-header`]: {
        height: `var(--icon-size)`,
      },

      [`${itemCls}-title`]: {
        flex: '0 1 auto',
      },
      [`${itemCls}-description`]: {
        maxWidth: descriptionMaxWidth,
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
        flex: 1,
      },

      [`${itemCls}-wrapper`]: {
        flexDirection: 'column',
        rowGap: token.paddingSM,
        alignItems: 'center',
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

      // With descriptionMaxWidth
      ...getItemWithWidthStyle(token, iconSize, marginXS, {
        [`${itemCls}:last-child`]: {
          flex: 'none',
        },

        // Icon
        [`${itemCls}-icon`]: {
          alignSelf: 'flex-start',
        },

        // Section
        [`${itemCls}-section`]: {
          width: descriptionMaxWidth,
        },
      }),
    },
  };
};
export default genLabelPlacementStyle;
