import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { TimelineToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genHorizontalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls, fontHeight, antCls } = token;
  const itemCls = `${componentCls}-item`;
  const [varName, varRef] = genCssVar(antCls, 'timeline');
  return {
    [`${componentCls}-horizontal`]: {
      '--steps-title-vertical-row-gap': token.paddingXS,
      [varName('content-height')]: unit(fontHeight),

      // =============================================================
      // ==                          Share                          ==
      // =============================================================
      alignItems: 'stretch',

      // =============================================================
      // ==                        Alternate                        ==
      // =============================================================
      [`&${componentCls}-layout-alternate`]: {
        [itemCls]: {
          [`${itemCls}-wrapper`]: {
            [varName('alternate-content-offset')]:
              `calc(${varRef('content-height')} + var(--steps-title-vertical-row-gap) * 2 + var(--steps-icon-size-max))`,
            height: `calc(${varRef('content-height')} * 2 + var(--steps-title-vertical-row-gap) * 2 + var(--steps-icon-size-max))`,
          },

          // Icon
          [`${itemCls}-icon`]: {
            position: 'absolute',
          },

          // Icon & Rail
          [`${itemCls}-icon, ${itemCls}-rail`]: {
            position: 'absolute',
            top: '50%',
            transform: 'translate3d(0, -50%, 0)',
            margin: 0,
          },

          // Title & Content
          [`${itemCls}-title, ${itemCls}-subtitle, ${itemCls}-content`]: {
            whiteSpace: 'nowrap',
            maxWidth: 'unset',
          },

          // Title
          [`${itemCls}-title`]: {
            position: 'absolute',
            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translate3d(-50%, 0, 0)',
          },

          // Content
          [`${itemCls}-content`]: {
            position: 'absolute',
            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translate3d(-50%, 0, 0)',
          },

          // Placement
          '&-placement-start': {
            [`${itemCls}-title`]: {
              bottom: varRef('alternate-content-offset'),
            },
            [`${itemCls}-content`]: {
              top: varRef('alternate-content-offset'),
            },
          },
          '&-placement-end': {
            [`${itemCls}-title`]: {
              top: varRef('alternate-content-offset'),
            },
            [`${itemCls}-content`]: {
              bottom: varRef('alternate-content-offset'),
            },
          },
        },
      },

      // =============================================================
      // ==                        Same Side                        ==
      // =============================================================
      [`&:not(${componentCls}-layout-alternate)`]: {
        [`${itemCls}-placement-end`]: {
          display: 'flex',
          alignItems: 'flex-end',

          [`${itemCls}-wrapper`]: {
            flex: 'auto',
            flexDirection: 'column-reverse',
          },

          [`${itemCls}-rail`]: {
            top: 'auto',
            bottom: 'var(--steps-horizontal-rail-margin)',
            transform: 'translate3d(0, 50%, 0)',
          },
        },
      },
    },
  };
};

export default genHorizontalStyle;
