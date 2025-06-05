import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, descriptionMaxWidth, marginXS, fontHeightLG, calc } = token;

  const itemCls = `${componentCls}-item`;

  return {
    // ====================== Shared ======================
    [componentCls]: {
      // Dot Steps active icon size is 2px larger than the default icon size
      '--steps-icon-size-max':
        'max(var(--steps-icon-size), var(--steps-icon-size-active, var(--steps-icon-size)))',

      // Icon
      [`${itemCls}-icon`]: {
        marginBlockStart: `calc((var(--steps-heading-height) - var(--steps-icon-size)) / 2)`,
      },
    },

    // ==================== Horizontal ====================
    [`${componentCls}-title-horizontal`]: {
      '--steps-title-horizontal-item-margin': token.margin,
      '--steps-title-horizontal-rail-margin': token.margin,
      '--steps-title-horizontal-title-height': fontHeightLG,
      '--steps-heading-height': `max(var(--steps-icon-size), var(--steps-title-horizontal-title-height))`,

      // Horizontal only
      [`&${componentCls}-horizontal, &${componentCls}-horizontal-alternate`]: {
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

        [`${itemCls}-empty-header`]: {
          [`${itemCls}-header`]: {
            minHeight: 'auto',
          },

          [`${itemCls}-content`]: {
            marginTop: calc('var(--steps-heading-height)').sub(token.fontHeight).div(2).equal(),
          },
        },
      },

      // Shared
      [`${itemCls}-section`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${itemCls}-header`]: {
        minHeight: 'var(--steps-heading-height)',
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
      '--steps-heading-height': 'var(--steps-icon-size-max)',

      [`> ${itemCls}`]: {
        flex: 1,

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
