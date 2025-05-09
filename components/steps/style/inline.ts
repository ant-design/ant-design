import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genInlineStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, inlineDotSize } = token;
  const containerPaddingTop = token.calc(token.paddingXS).add(token.lineWidth).equal();
  // const titleStyle = {
  //   [`${componentCls}-item-container ${componentCls}-item-content ${componentCls}-item-title`]: {
  //     color: inlineTitleColor,
  //   },
  // };

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}-inline`]: {
      '--steps-items-offset': '0',
      '--steps-item-wrapper-padding-top': containerPaddingTop,

      // width: 'auto',
      display: 'inline-flex',

      '&:before': {
        content: '""',
        flex: 'var(--steps-items-offset)',
      },

      [itemCls]: {
        // ========================= Variable =========================
        // Item
        '--steps-label-vertical-row-gap': token.paddingXS,

        // Icon
        '--steps-icon-size': inlineDotSize,
        '--ant-steps-dot-size': inlineDotSize,
        '--ant-steps-dot-current-size': inlineDotSize,

        // Title
        '--steps-title-font-size': token.fontSizeSM,
        '--steps-title-line-height': token.lineHeightSM,
        '--steps-item-title-color': token.colorTextSecondary,

        '--steps-subtitle-font-size': token.fontSizeSM,
        '--steps-subtitle-line-height': token.lineHeightSM,
        '--steps-item-subtitle-color': token.colorTextQuaternary,

        // Rail
        '--steps-rail-size': token.lineWidth,
        '--steps-label-horizontal-rail-gap': '0px',

        // ========================== Styles ==========================
        flex: 1,

        '&-wrapper': {
          paddingInline: token.paddingXXS,
          marginInline: token.calc(token.marginXXS).div(2).equal(),
          borderRadius: token.borderRadiusSM,
          cursor: 'pointer',
          transition: `background-color ${token.motionDurationMid}`,
          '&:hover': {
            background: token.controlItemBgHover,
          },
          "&[role='button']:hover": {
            opacity: 1,
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
        '&-description': {
          display: 'none',
        },
      },
    },
  };
};

export default genInlineStyle;
