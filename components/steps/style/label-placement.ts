import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import { getItemWithWidthStyle } from './util';

const genLabelPlacementStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const {
    componentCls,
    descriptionMaxWidth,
    marginXS,
    fontHeightLG,
    margin,
    paddingSM,
    marginXXS,
    antCls,
    calc,
  } = token;

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, 'steps');

  return {
    // ====================== Shared ======================
    [componentCls]: {
      // Dot Steps active icon size is 2px larger than the default icon size
      [varName('icon-size-max')]:
        `max(${varRef('icon-size')}, ${varRef('icon-size-active', varRef('icon-size'))})`,

      // Icon
      [`${itemCls}-icon`]: {
        marginBlockStart: `calc((${varRef('heading-height')} - ${varRef('icon-size')}) / 2)`,
      },
    },

    // ==================== Horizontal ====================
    [`${componentCls}-title-horizontal`]: {
      [varName('title-horizontal-item-margin')]: margin,
      [varName('title-horizontal-rail-margin')]: margin,
      [varName('title-horizontal-title-height')]: fontHeightLG,
      [varName('heading-height')]:
        `max(${varRef('icon-size')}, ${varRef('title-horizontal-title-height')})`,

      // Horizontal only
      [`&${componentCls}-horizontal, &${componentCls}-horizontal-alternate`]: {
        [`${itemCls}:not(:first-child)`]: {
          marginInlineStart: varRef('title-horizontal-item-margin'),
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
            marginTop: calc(varRef('heading-height')).sub(token.fontHeight).div(2).equal(),
          },
        },
      },

      // Shared
      [`${itemCls}-section`]: {
        flex: 1,
        minWidth: 0,
      },

      [`${itemCls}-header`]: {
        minHeight: varRef('heading-height'),
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
        [varName('item-wrapper-padding-top')]: '0px',

        flex: 1,
        marginInlineStart: varRef('title-horizontal-rail-margin'),
      },
    },

    // ===================== Vertical =====================
    [`${componentCls}-title-vertical`]: {
      [varName('title-vertical-row-gap')]: paddingSM,
      [varName('title-horizontal-rail-gap')]: marginXXS,
      [varName('heading-height')]: varRef('icon-size-max'),

      [`> ${itemCls}`]: {
        flex: 1,

        [`${itemCls}-wrapper`]: {
          flexDirection: 'column',
          rowGap: varRef('title-vertical-row-gap'),
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
          width: `calc(100% - ${varRef('icon-size')} - ${varRef('title-horizontal-rail-gap')} * 2)`,
          insetInlineStart: `calc(50% + ${varRef('icon-size')} / 2 + ${varRef('title-horizontal-rail-gap')})`,
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
