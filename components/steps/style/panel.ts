import { unit, type CSSObject } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genPanelStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, calc, lineWidthBold } = token;

  const itemCls = `${componentCls}-item`;

  return {
    [`${componentCls}${componentCls}-panel`]: [
      // ==========================================================
      // ==                       Clean up                       ==
      // ==========================================================
      {
        // ====================== Shared ======================
        [`${itemCls}-rail`]: {
          display: 'none',
        },

        // ==================== Horizontal ====================
        [`&${componentCls}-horizontal`]: {
          alignItems: 'stretch',

          [itemCls]: {
            flex: 'auto',
            margin: 0,
          },
        },
      },

      // ==========================================================
      // ==                       Template                       ==
      // ==========================================================
      {
        '&': {
          // Base height = padding * 2 + iconSize + descriptionHeight
          '--steps-panel-padding': token.padding,
          '--steps-panel-border-color': '#000',
          '--steps-panel-bg-color': '#EEE',
          '--steps-item-base-height': calc('var(--steps-panel-padding)')
            .mul(2)
            .add('var(--steps-icon-size)')
            .add(calc(token.fontSize).mul(token.lineHeight).equal())
            .equal(),

          // border: `${unit(lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`,
          // borderRadius: token.borderRadius,
        },

        [`${componentCls}-panel-arrow`]: {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          zIndex: 1,
          height: '100%',
          width: 'calc(var(--steps-item-base-height) * 0.7071)',
          overflow: 'visible',
          strokeLinecap: 'round',

          path: {
            fill: 'var(--steps-panel-bg-color)',
            stroke: 'var(--steps-panel-border-color)',
            strokeWidth: lineWidthBold,
            vectorEffect: 'non-scaling-stroke',
          },
        },

        [itemCls]: {
          boxShadow: '0 0 0 1px rgba(255,0,0,0.1)',
          padding: 'var(--steps-panel-padding)',
          background: 'var(--steps-panel-bg-color)',
          position: 'relative',
          // border: `${unit(token.lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`,

          '&:not(:last-child)': {
            //   borderInlineEnd: 0,
            // clipPath: `circle(40%)`,
            // outline: `${unit(token.lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`,
          },

          '&:not(:first-child)': {
            // borderInlineStart: 0,
            // '&:before,&:after': {
            //   content: '""',
            //   position: 'absolute',
            //   height: 'calc(100% * 0.7071)',
            //   borderInlineEnd: `${unit(token.lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`,
            // },
            // '&:before': {
            //   bottom: `50%`,
            //   insetInlineStart: 0,
            //   transformOrigin: '0% 100%',
            //   transform: 'rotate(-45deg)',
            // },
            // '&:after': {
            //   top: '50%',
            //   insetInlineStart: 0,
            //   transformOrigin: '0% 0%',
            //   transform: 'rotate(45deg)',
            // },
            // '&:after': {
            //   content: '""',
            //   position: 'absolute',
            //   // height: calc('100%').add(lineWidthBold).add(lineWidthBold).mul(0.7071).equal(),
            //   height: calc('var(--steps-item-base-height)').mul(0.7071).equal(),
            //   width: 'auto',
            //   aspectRatio: '1 / 1',
            //   // border: `${unit(lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`,
            //   background: 'rgba(255, 0, 0, 0.1)',
            //   insetInlineEnd: 0,
            //   top: calc(lineWidthBold).mul(-1).equal(),
            //   transformOrigin: '100% 0%',
            //   // transform: 'translateX(69%) rotate(45deg)',
            //   transform: 'translateX(69%) rotate(-45deg)',
            //   zIndex: 1,
            // },
          },
        },
      },
    ],
  };
};
export default genPanelStyle;
