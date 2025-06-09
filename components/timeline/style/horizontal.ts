import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { TimelineToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genHorizontalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls, fontHeight } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-horizontal`]: {
      '--steps-title-vertical-row-gap': token.paddingXS,
      '--timeline-content-height': `${unit(fontHeight)}`,

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
            height: `calc(var(--timeline-content-height) * 2 + var(--steps-title-vertical-row-gap) * 2 + var(--steps-icon-size-max))`,
          },

          // Icon
          [`${itemCls}-icon`]: {
            position: 'absolute',
          },

          // Icon & Rail
          [`${itemCls}-icon, ${itemCls}-rail`]: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            margin: 0,
          },

          // Title
          [`${itemCls}-title`]: {
            position: 'absolute',
            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          },

          // Content
          [`${itemCls}-content`]: {
            position: 'absolute',

            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          },

          // Position
          '&-position-start': {
            [`${itemCls}-title`]: { top: 0 },
            [`${itemCls}-content`]: {
              bottom: 0,
            },
          },
          '&-position-end': {
            [`${itemCls}-title`]: { bottom: 0 },
            [`${itemCls}-content`]: {
              top: 0,
            },
          },
        },
      },

      // =============================================================
      // ==                        Same Side                        ==
      // =============================================================
      [`&:not(${componentCls}-layout-alternate)`]: {
        [`${itemCls}-position-end`]: {
          display: 'flex',
          alignItems: 'flex-end',

          [`${itemCls}-wrapper`]: {
            flex: 'auto',
            flexDirection: 'column-reverse',
          },

          [`${itemCls}-section`]: {},

          [`${itemCls}-rail`]: {
            top: 'auto',
            bottom: 'var(--steps-horizontal-rail-margin)',
            transform: 'translateY(50%)',
          },
        },
      },
    },
  };
};

export default genHorizontalStyle;
