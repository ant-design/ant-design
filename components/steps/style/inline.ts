import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genInlineStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, inlineDotSize } = token;
  const containerPaddingTop = token.calc(token.paddingXS).add(token.lineWidth).equal();

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-inline`]: {
      '--steps-items-offset': '0',
      '--steps-item-wrapper-padding-top': containerPaddingTop,

      display: 'inline-flex',

      '&:before': {
        content: '""',
        flex: 'var(--steps-items-offset)',
      },

      [itemCls]: {
        // ========================= Variable =========================
        // Item
        '--steps-title-vertical-row-gap': token.paddingXS,

        // Icon
        '--steps-icon-size': inlineDotSize,
        '--steps-icon-size-active': inlineDotSize,

        // Title
        '--steps-title-font-size': token.fontSizeSM,
        '--steps-title-line-height': token.lineHeightSM,
        '--steps-item-title-color': token.colorTextSecondary,

        '--steps-subtitle-font-size': token.fontSizeSM,
        '--steps-subtitle-line-height': token.lineHeightSM,
        '--steps-item-subtitle-color': token.colorTextQuaternary,

        // Rail
        '--steps-rail-size': token.lineWidth,
        '--steps-title-horizontal-rail-gap': '0px',

        // ========================== Styles ==========================
        flex: 1,

        '&-wrapper': {
          paddingInline: token.paddingXXS,
          marginInline: token.calc(token.marginXXS).div(2).equal(),
          borderRadius: token.borderRadiusSM,
          cursor: 'pointer',
          transition: `background ${token.motionDurationMid}`,
          '&:hover': {
            background: token.controlItemBgHover,
          },
        },

        // Icon
        '&-icon': {
          [`${itemCls}-icon-dot`]: {
            '&:after': {
              display: 'none',
            },
          },
        },

        // Header
        '&-title': {
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
        },
        '&-content': {
          display: 'none',
        },
      },
    },
  };
};

export default genInlineStyle;
