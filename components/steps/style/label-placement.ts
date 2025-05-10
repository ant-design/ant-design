import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, descriptionMaxWidth, marginXS } = token;

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
      [`${itemCls}-content`]: {
        maxWidth: descriptionMaxWidth,
      },

      [`${itemCls}-subtitle`]: {
        flex: '0 9999 auto',
      },

      [`&${componentCls}-horizontal ${itemCls}-rail`]: {
        '--steps-item-wrapper-padding-top': '0px',

        flex: 1,
        marginInlineStart: `var(--steps-label-horizontal-rail-margin)`,
      },
    },

    // ===================== Vertical =====================
    [`${componentCls}-label-vertical`]: {
      '--steps-label-vertical-row-gap': token.paddingSM,
      '--steps-label-horizontal-rail-gap': token.marginXXS,

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
        width: `calc(100% - var(--steps-icon-size) - var(--steps-label-horizontal-rail-gap) * 2)`,
        insetInlineStart: `calc(50% + var(--steps-icon-size) / 2 + var(--steps-label-horizontal-rail-gap))`,
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
