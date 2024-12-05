import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import { initZoomMotion } from '../../style/motion';
import type { ArrowOffsetToken } from '../../style/placementArrow';
import getArrowStyle, {
  getArrowOffsetToken,
  MAX_VERTICAL_CONTENT_RADIUS,
} from '../../style/placementArrow';
import type { ArrowToken } from '../../style/roundedArrow';
import { getArrowToken } from '../../style/roundedArrow';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genPresetColor, genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken extends ArrowOffsetToken, ArrowToken {
  /**
   * @desc 文字提示 z-index
   * @descEN z-index of tooltip
   */
  zIndexPopup: number;
}

interface TooltipToken extends FullToken<'Tooltip'> {
  // default variables
  tooltipMaxWidth: number;
  tooltipColor: string;
  tooltipBg: string;
  tooltipBorderRadius: number;
}

const genTooltipStyle: GenerateStyle<TooltipToken> = (token) => {
  const {
    calc,
    componentCls, // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    arrowOffsetHorizontal,
    sizePopupArrow,
  } = token;

  // arrowOffsetHorizontal + arrowWidth + borderRadius
  const edgeAlignMinWidth = calc(tooltipBorderRadius)
    .add(sizePopupArrow)
    .add(arrowOffsetHorizontal)
    .equal();

  // borderRadius * 2 + arrowWidth
  const centerAlignMinWidth = calc(tooltipBorderRadius).mul(2).add(sizePopupArrow).equal();

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: zIndexPopup,
        display: 'block',
        width: 'max-content',
        maxWidth: tooltipMaxWidth,
        visibility: 'visible',

        // When use `autoArrow`, origin will follow the arrow position
        '--valid-offset-x': 'var(--arrow-offset-horizontal, var(--arrow-x))',
        transformOrigin: [`var(--valid-offset-x, 50%)`, `var(--arrow-y, 50%)`].join(' '),

        '&-hidden': {
          display: 'none',
        },

        '--antd-arrow-background-color': tooltipBg,

        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: centerAlignMinWidth,
          minHeight: controlHeight,
          padding: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,
          color: tooltipColor,
          textAlign: 'start',
          textDecoration: 'none',
          wordWrap: 'break-word',
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary,
          boxSizing: 'border-box',
        },

        // Align placement should have another min width
        [[
          `&-placement-topLeft`,
          `&-placement-topRight`,
          `&-placement-bottomLeft`,
          `&-placement-bottomRight`,
        ].join(',')]: {
          minWidth: edgeAlignMinWidth,
        },

        // Limit left and right placement radius
        [[
          `&-placement-left`,
          `&-placement-leftTop`,
          `&-placement-leftBottom`,
          `&-placement-right`,
          `&-placement-rightTop`,
          `&-placement-rightBottom`,
        ].join(',')]: {
          [`${componentCls}-inner`]: {
            borderRadius: token.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS),
          },
        },

        [`${componentCls}-content`]: {
          position: 'relative',
        },

        // generator for preset color
        ...genPresetColor(token, (colorKey, { darkColor }) => ({
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor,
            },
            [`${componentCls}-arrow`]: {
              '--antd-arrow-background-color': darkColor,
            },
          },
        })),

        // RTL
        '&-rtl': {
          direction: 'rtl',
        },
      },
    },

    // Arrow Style
    getArrowStyle(token, 'var(--antd-arrow-background-color)'),

    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: 'relative',
        maxWidth: 'none',
        margin: token.sizePopupArrow,
      },
    },
  ];
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Tooltip'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 70,
  ...getArrowOffsetToken({
    contentRadius: token.borderRadius,
    limitVerticalRadius: true,
  }),
  ...getArrowToken(
    mergeToken<TooltipToken>(token, {
      borderRadiusOuter: Math.min(token.borderRadiusOuter, 4),
    }),
  ),
});

export default (prefixCls: string, injectStyle = true) => {
  const useStyle = genStyleHooks(
    'Tooltip',
    (token) => {
      const { borderRadius, colorTextLightSolid, colorBgSpotlight } = token;

      const TooltipToken = mergeToken<TooltipToken>(token, {
        // default variables
        tooltipMaxWidth: 250,
        tooltipColor: colorTextLightSolid,
        tooltipBorderRadius: borderRadius,
        tooltipBg: colorBgSpotlight,
      });

      return [genTooltipStyle(TooltipToken), initZoomMotion(token, 'zoom-big-fast')];
    },
    prepareComponentToken,
    {
      resetStyle: false,
      // Popover use Tooltip as internal component. We do not need to handle this.
      injectStyle,
    },
  );

  return useStyle(prefixCls);
};
