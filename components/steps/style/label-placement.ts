import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { calc, componentCls, descriptionMaxWidth, marginXS } = token;

  const itemCls = `${componentCls}-item`;

  return {
    // ==================== Horizontal ====================
    [`${componentCls}-label-horizontal`]: {
      '--steps-label-horizontal-item-margin': token.margin,
      '--steps-label-horizontal-rail-margin': token.margin,

      // Horizontal only
      [`&${componentCls}-horizontal`]: {
        [`${itemCls}:not(:first-child)`]: {
          marginInlineStart: `var(--steps-label-horizontal-item-margin)`,
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
        height: `var(--steps-icon-size)`,
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
        marginInlineStart: `var(--steps-label-horizontal-rail-margin)`,
      },
    },

    // ===================== Vertical =====================
    [`${componentCls}-label-vertical`]: {
      '--steps-label-vertical-row-gap': token.paddingSM,

      [itemCls]: {
        flex: 1,
      },

      [`${itemCls}-wrapper`]: {
        flexDirection: 'column',
        rowGap: `var(--steps-label-vertical-row-gap)`,
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
        width: calc('100%')
          .sub(`var(--steps-icon-size)`)
          .sub(calc(token.marginXXS).mul(2).equal())
          .equal(),
        insetInlineStart: calc('50%')
          .add(calc(`var(--steps-icon-size)`).div(2).equal())
          .add(token.marginXXS)
          .equal(),
      },

      // With descriptionMaxWidth
      ...getItemWithWidthStyle(token, marginXS, {
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
