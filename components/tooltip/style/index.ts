import { resetComponent } from '../../style';
import { initZoomMotion } from '../../style/motion';
import getArrowStyle, { MAX_VERTICAL_CONTENT_RADIUS } from '../../style/placementArrow';
import type { FullToken, GenerateStyle, UseComponentStyleResult } from '../../theme/internal';
import { genComponentStyleHook, genPresetColor, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  colorBgDefault: string;
  tooltipMaxWidth: number;
  tooltipColor: string;
  tooltipBg: string;
  tooltipBorderRadius: number;
}

interface TooltipToken extends FullToken<'Tooltip'> {
  // default variables
  tooltipRadiusOuter: number;
}

const genTooltipStyle: GenerateStyle<TooltipToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: token.zIndexPopupBase + 70,
        display: 'block',
        width: 'max-content',
        maxWidth: token.tooltipMaxWidth,
        visibility: 'visible',
        transformOrigin: `var(--arrow-x, 50%) var(--arrow-y, 50%)`,
        '&-hidden': {
          display: 'none',
        },

        '--antd-arrow-background-color': token.tooltipBg,

        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: token.controlHeight,
          minHeight: token.controlHeight,
          padding: `${token.paddingSM / 2}px ${token.paddingXS}px`,
          color: token.tooltipColor,
          textAlign: 'start',
          textDecoration: 'none',
          wordWrap: 'break-word',
          backgroundColor: token.tooltipBg,
          borderRadius: token.tooltipBorderRadius,
          boxShadow: token.boxShadowSecondary,
          boxSizing: 'border-box',
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
            borderRadius: Math.min(token.tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS),
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
    getArrowStyle<TooltipToken>(
      mergeToken<TooltipToken>(token, {
        borderRadiusOuter: token.tooltipRadiusOuter,
      }),
      {
        colorBg: 'var(--antd-arrow-background-color)',
        contentRadius: token.tooltipBorderRadius,
        limitVerticalRadius: true,
      },
    ),

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
export default (prefixCls: string, injectStyle: boolean): UseComponentStyleResult => {
  const useOriginHook = genComponentStyleHook(
    'Tooltip',
    (token) => {
      // Popover use Tooltip as internal component. We do not need to handle this.
      if (injectStyle === false) {
        return [];
      }

      const TooltipToken = mergeToken<TooltipToken>(token, {
        // default variables
        tooltipRadiusOuter: token.borderRadiusOuter > 4 ? 4 : token.borderRadiusOuter,
      });

      return [genTooltipStyle(TooltipToken), initZoomMotion(token, 'zoom-big-fast')];
    },
    (token) => ({
      colorBgDefault: token.colorBgSpotlight,
      tooltipMaxWidth: 250,
      tooltipColor: token.colorTextLightSolid,
      tooltipBorderRadius: token.borderRadius,
      tooltipBg: token.colorBgSpotlight,
    }),
    {
      resetStyle: false,
    },
  );

  return useOriginHook(prefixCls);
};
