import type { CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genInlineStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, inlineDotSize, paddingXS, lineWidth, antCls, calc } = token;
  const containerPaddingTop = calc(paddingXS).add(lineWidth).equal();

  const itemCls = `${componentCls}-item`;

  const [varName, varRef] = genCssVar(antCls, 'cmp-steps');

  return {
    [`${componentCls}-inline`]: {
      [varName('items-offset')]: '0',
      [varName('item-wrapper-padding-top')]: containerPaddingTop,

      display: 'inline-flex',

      '&:before': {
        content: '""',
        flex: varRef('items-offset'),
      },

      [itemCls]: {
        // ========================= Variable =========================
        // Item
        [varName('title-vertical-row-gap')]: paddingXS,

        // Icon
        [varName('icon-size')]: inlineDotSize,
        [varName('icon-size-active')]: inlineDotSize,
        // Title
        [varName('title-font-size')]: token.fontSizeSM,
        [varName('title-line-height')]: token.lineHeightSM,
        [varName('item-title-color')]: token.colorTextSecondary,
        [varName('subtitle-font-size')]: token.fontSizeSM,
        [varName('subtitle-line-height')]: token.lineHeightSM,
        [varName('item-subtitle-color')]: token.colorTextQuaternary,

        // Rail
        [varName('rail-size')]: token.lineWidth,
        [varName('title-horizontal-rail-gap')]: '0px',
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
