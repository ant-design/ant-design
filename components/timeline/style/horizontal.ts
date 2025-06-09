import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { TimelineToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genHorizontalStyle: GenerateStyle<TimelineToken, CSSObject> = (token) => {
  const { componentCls, itemHeadSize, customHeadPaddingVertical, fontHeight } = token;
  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-horizontal`]: {
      '--steps-title-vertical-row-gap': token.paddingXS,
      '--timeline-content-height': `${unit(fontHeight)}`,

      background: 'rgba(255, 0,0,0.1)',

      [`&${componentCls}-layout-alternate`]: {
        [itemCls]: {
          height: `calc(var(--timeline-content-height) * 2 + var(--steps-title-vertical-row-gap) * 2 + var(--steps-icon-size-max))`,

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

          // TODO: ant-steps-item-header fixed at top & ant-steps-item-content at bottom
        },
      },
    },
  };
};

export default genHorizontalStyle;
