import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { TimelineToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genHorizontalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls, fontHeight, paddingXS, antCls } = token;
  const itemCls = `${componentCls}-item`;
  const [stepsVarName, stepsVarRef] = genCssVar(antCls, '_steps_'); // TODO: change `_steps_` to `steps`

  const [timelineVarName, timelineVarRef] = genCssVar(antCls, 'timeline');

  return {
    [`${componentCls}-horizontal`]: {
      [stepsVarName('title-vertical-row-gap')]: paddingXS,
      [timelineVarName('content-height')]: unit(fontHeight),

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
            [timelineVarName('alternate-content-offset')]:
              `calc(${timelineVarRef('content-height')} + ${stepsVarRef('title-vertical-row-gap')} * 2 + ${stepsVarRef('icon-size-max')})`,
            height: `calc(${timelineVarRef('content-height')} * 2 + ${stepsVarRef('title-vertical-row-gap')} * 2 + ${stepsVarRef('icon-size-max')})`,
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
              bottom: timelineVarRef('alternate-content-offset'),
            },
            [`${itemCls}-content`]: {
              top: timelineVarRef('alternate-content-offset'),
            },
          },
          '&-placement-end': {
            [`${itemCls}-title`]: {
              top: timelineVarRef('alternate-content-offset'),
            },
            [`${itemCls}-content`]: {
              bottom: timelineVarRef('alternate-content-offset'),
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
            bottom: stepsVarRef('horizontal-rail-margin'),
            transform: 'translate3d(0, 50%, 0)',
          },
        },
      },
    },
  };
};

export default genHorizontalStyle;
