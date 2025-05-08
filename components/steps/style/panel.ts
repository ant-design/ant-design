import { CSSObject, unit } from '@ant-design/cssinjs';

import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';
import { STATUS_ERROR, STATUS_PROCESS } from './status';

const genPanelStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, calc, lineWidthBold, borderRadius, borderRadiusSM } = token;

  const itemCls = `${componentCls}-item`;

  const borderStyle = `${unit(lineWidthBold)} ${token.lineType} var(--steps-panel-border-color)`;

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
            flex: 1,
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
          '--steps-panel-padding': token.paddingSM,
          '--steps-panel-border-color': '#000',
          '--steps-panel-bg-color': '#EEE',
          '--steps-panel-title-height': `calc(var(--steps-title-font-size) * var(--steps-title-line-height))`,
          '--steps-item-base-height': calc('var(--steps-panel-padding)')
            .mul(2)
            .add('var(--steps-icon-size)')
            .add('var(--steps-panel-title-height)')
            .equal(),
          '--steps-item-base-width': 'calc(var(--steps-item-base-height) * 0.7071)',
          '--steps-item-border-radius': borderRadius,
        },

        // ======================= Icon =======================
        [`${itemCls}-icon`]: {
          display: 'none',
        },

        // ====================== Header ======================
        [`${itemCls}-header`]: {
          height: 'auto',
        },

        // ====================== Arrow =======================
        [`${componentCls}-panel-arrow`]: {
          position: 'absolute',
          top: calc(lineWidthBold).mul(-1).equal(),
          insetInlineStart: '100%',
          zIndex: 1,
          height: calc(lineWidthBold).mul(2).add('100%').equal(),
          width: 'var(--steps-item-base-width)',
          overflow: 'visible',
          strokeLinecap: 'round',

          path: {
            fill: 'var(--steps-panel-bg-color)',
            stroke: 'var(--steps-panel-border-color)',
            strokeWidth: lineWidthBold,
            vectorEffect: 'non-scaling-stroke',
          },
        },

        [`${itemCls}:last-child ${componentCls}-panel-arrow`]: {
          display: 'none',
        },

        // ======================= Item =======================
        [itemCls]: {
          // boxShadow: '0 0 0 1px rgba(255,0,0,0.1)',
          padding: 'var(--steps-panel-padding)',
          background: 'var(--steps-panel-bg-color)',
          position: 'relative',
          borderBlock: borderStyle,

          '&:not(:first-child)': {
            paddingInlineStart: `calc(var(--steps-panel-padding) + var(--steps-item-base-width))`,
          },

          '&:first-child': {
            borderInlineStart: borderStyle,
            borderStartStartRadius: 'var(--steps-item-border-radius)',
            borderEndStartRadius: 'var(--steps-item-border-radius)',
          },

          '&:last-child': {
            borderInlineEnd: borderStyle,
            borderStartEndRadius: 'var(--steps-item-border-radius)',
            borderEndEndRadius: 'var(--steps-item-border-radius)',
          },
        },
      },

      // ==========================================================
      // ==              =          Size        =                ==
      // ==========================================================
      {
        [`&${componentCls}-small`]: {
          '--steps-panel-padding': token.paddingXS,
          '--steps-item-border-radius': borderRadiusSM,
        },
      },

      // ==========================================================
      // ==                        Filled                        ==
      // ==========================================================
      {
        [`&${componentCls}-filled`]: {
          [itemCls]: {
            '--steps-panel-bg-color': 'var(--steps-item-icon-bg-color)',
            '--steps-panel-border-color': 'var(--steps-item-icon-border-color)',

            '&:not(:first-child)': {
              paddingInlineStart: `calc(var(--steps-panel-padding) + var(--steps-item-base-width))`,
              clipPath: `polygon(${[
                `${unit(lineWidthBold)} 0`,
                'calc(100% + var(--steps-item-base-width)) 0',
                'calc(100% + var(--steps-item-base-width)) 100%',
                `${unit(lineWidthBold)} 100%`,
                `calc(var(--steps-item-base-width) + ${unit(lineWidthBold)}) 50%`,
              ].join(',')})`,
            },

            // Process
            [`&-${STATUS_PROCESS}`]: {
              '--steps-item-title-color': token.colorTextLightSolid,
              '--steps-item-description-color': token.colorTextLightSolid,
              '--steps-item-description-active-color': token.colorTextLightSolid,
              // Hover
              '--steps-item-text-hover-color': token.colorTextLightSolid,
            },

            // Error
            [`&-${STATUS_ERROR}`]: {
              '--steps-item-title-color': token.colorTextLightSolid,
              '--steps-item-description-color': token.colorTextLightSolid,
              '--steps-item-description-active-color': token.colorTextLightSolid,
              // Hover
              '--steps-item-text-hover-color': token.colorTextLightSolid,
            },
          },
        },
      },

      // ==========================================================
      // ==                       Outlined                       ==
      // ==========================================================
      {
        [`&${componentCls}-outlined`]: {
          [`${componentCls}-panel-arrow`]: {
            top: calc(lineWidthBold).div(2).mul(-1).equal(),
            height: calc(lineWidthBold).add('100%').equal(),
          },

          [itemCls]: {
            '--steps-panel-bg-color': 'transparent',
            '--steps-panel-border-color': 'var(--steps-item-icon-border-color)',
          },
        },
      },
    ],
  };
};
export default genPanelStyle;
