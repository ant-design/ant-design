import type { CSSObject } from '@ant-design/cssinjs';

import type { GenerateStyle } from '../../theme/internal';
import type { TableToken } from './index';

export function getShadowStyle({
  colorSplit: shadowColor,
}: Pick<TableToken, 'colorSplit'>): [left: CSSObject, right: CSSObject] {
  const leftShadowStyle: CSSObject = { boxShadow: `inset 10px 0 8px -8px ${shadowColor}` };

  const rightShadowStyle: CSSObject = {
    boxShadow: `inset -10px 0 8px -8px ${shadowColor}`,
  };

  return [leftShadowStyle, rightShadowStyle];
}

const genFixedStyle: GenerateStyle<TableToken, CSSObject> = (token) => {
  const {
    componentCls,
    lineWidth,
    motionDurationSlow,
    zIndexTableFixed,
    tableBg,
    zIndexTableSticky,
    calc,
  } = token;

  const cellCls = `${componentCls}-cell`;
  const fixCellCls = `${cellCls}-fix`;

  const sharedShadowStyle: CSSObject = {
    position: 'absolute',
    top: 0,
    bottom: calc(lineWidth).mul(-1).equal(),
    width: 30,
    transition: `box-shadow ${motionDurationSlow}`,
    content: '""',
    pointerEvents: 'none',
  };

  const [leftShadowStyle, rightShadowStyle] = getShadowStyle(token);

  // Follow style is magic of shadow which should not follow token:
  return {
    [`${componentCls}-wrapper`]: {
      // ====================== Cell ======================
      [`${cellCls}${fixCellCls}`]: {
        position: 'sticky',
      },

      [fixCellCls]: {
        zIndex: `calc(var(--z-offset) + ${zIndexTableFixed})`,
        background: tableBg,

        '&:after': sharedShadowStyle,

        // Position
        '&-start:after': {
          insetInlineStart: '100%',
        },

        '&-end:after': {
          insetInlineEnd: '100%',
        },

        // visible
        '&-start-shadow-show:after': leftShadowStyle,
        '&-end-shadow-show:after': rightShadowStyle,
      },

      // =================== Container ====================
      [`${componentCls}-container`]: {
        position: 'relative',

        '&:before, &:after': {
          ...sharedShadowStyle,
          zIndex: calc(zIndexTableSticky).add(1).equal({ unit: false }),
        },

        '&:before': {
          insetInlineStart: 0,
        },
        '&:after': {
          insetInlineEnd: 0,
        },
      },

      [`${componentCls}-fix-start-shadow-show ${componentCls}-container:before`]: leftShadowStyle,
      [`${componentCls}-fix-end-shadow-show ${componentCls}-container:after`]: rightShadowStyle,
    },
  };
};

export default genFixedStyle;
