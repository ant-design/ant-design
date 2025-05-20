import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, descriptionMaxWidth, marginXS } = token;

  const itemCls = `${componentCls}-item`;

  return {
    // ==================== Horizontal ====================
    [`${componentCls}-title-horizontal`]: {
      '--steps-title-horizontal-item-margin': token.margin,
      '--steps-title-horizontal-rail-margin': token.margin,

      // Horizontal only
      [`&${componentCls}-horizontal`]: {
        [`${itemCls}:not(:first-child)`]: {
          marginInlineStart: `var(--steps-title-horizontal-item-margin)`,
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
      [`${itemCls}-content`]: {
        maxWidth: descriptionMaxWidth,
      },

      [`${itemCls}-subtitle`]: {
        flex: '0 9999 auto',
      },

      [`&${componentCls}-horizontal ${itemCls}-rail`]: {
        '--steps-item-wrapper-padding-top': '0px',

        flex: 1,
        marginInlineStart: `var(--steps-title-horizontal-rail-margin)`,
      },
    },

    // ===================== Vertical =====================
    [`${componentCls}-title-vertical`]: {
      '--steps-title-vertical-row-gap': token.paddingSM,
      '--steps-title-horizontal-rail-gap': token.marginXXS,

      [itemCls]: {
        flex: 1,
      },

      [`${itemCls}-wrapper`]: {
        flexDirection: 'column',
        rowGap: `var(--steps-title-vertical-row-gap)`,
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

      // >>> title & subtitle & Content
      [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
        textAlign: 'center',
        maxWidth: '100%',
      },

      [`${itemCls}-subtitle`]: {
        margin: 0,
      },

      // >>> rail
      [`${itemCls}-rail`]: {
        position: 'absolute',
        top: 0,
        width: `calc(100% - var(--steps-icon-size) - var(--steps-title-horizontal-rail-gap) * 2)`,
        insetInlineStart: `calc(50% + var(--steps-icon-size) / 2 + var(--steps-title-horizontal-rail-gap))`,
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
