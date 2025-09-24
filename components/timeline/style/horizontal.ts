import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { TimelineToken } from '.';
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
            '--timeline-alternate-content-offset': `calc(var(--timeline-content-height) + var(--steps-title-vertical-row-gap) * 2 + var(--steps-icon-size-max))`,
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
            transform: 'translateX(-50%)',
          },

          // Content
          [`${itemCls}-content`]: {
            position: 'absolute',

            left: {
              _skip_check_: true,
              value: '50%',
            },
            transform: 'translateX(-50%)',
          },

          // Placement
          '&-placement-start': {
            [`${itemCls}-title`]: { bottom: 'var(--timeline-alternate-content-offset)' },
            [`${itemCls}-content`]: {
              top: 'var(--timeline-alternate-content-offset)',
            },
          },
          '&-placement-end': {
            [`${itemCls}-title`]: { top: 'var(--timeline-alternate-content-offset)' },
            [`${itemCls}-content`]: {
              bottom: 'var(--timeline-alternate-content-offset)',
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
            transform: 'translateY(50%)',
          },
        },
      },
    },
  };
};

export default genHorizontalStyle;
