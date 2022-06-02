// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type {
  FullToken,
  GenerateStyle,
  PresetColorType,
  UseComponentStyleResult,
} from '../../_util/theme';
import {
  genComponentStyleHook,
  mergeToken,
  PresetColors,
  resetComponent,
  getArrowStyle,
} from '../../_util/theme';

export interface ComponentToken {
  zIndexPopup: number;
}

interface TooltipToken extends FullToken<'Tooltip'> {
  // default variables
  tooltipMaxWidth: number;
  tooltipColor: string;
  tooltipBg: string;
  tooltipBorderRadius: number;
}

const generatorTooltipPresetColor: GenerateStyle<TooltipToken, CSSObject> = token => {
  const { componentCls } = token;

  return PresetColors.reduce((previousValue: any, currentValue: keyof PresetColorType) => {
    const lightColor = token[`${currentValue}-6`];
    previousValue[`&${componentCls}-${currentValue}`] = {
      [`${componentCls}-inner`]: {
        backgroundColor: lightColor,
      },
      [`${componentCls}-arrow`]: {
        background: lightColor,

        '--antd-arrow-background-color': lightColor,
      },
    };
    return previousValue;
  }, {});
};

const genTooltipStyle: GenerateStyle<TooltipToken> = token => {
  const {
    componentCls, // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadow,
    paddingSM,
    paddingXS,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        position: 'absolute',
        zIndex: zIndexPopup,
        display: 'block',
        '&': [{ width: 'max-content' }, { width: 'intrinsic' }],
        maxWidth: tooltipMaxWidth,
        visibility: 'visible',
        '&-hidden': {
          display: 'none',
        },

        '--antd-arrow-background-color': tooltipBg,

        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${paddingSM / 2}px ${paddingXS}px`,
          color: tooltipColor,
          textAlign: 'start',
          textDecoration: 'none',
          wordWrap: 'break-word',
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow,
        },

        [`${componentCls}-content`]: {
          position: 'relative',
        },

        // generator for preset color
        ...generatorTooltipPresetColor(token),

        // RTL
        '&-rtl': {
          direction: 'rtl',
        },
      },
    },

    // Arrow Style
    getArrowStyle(token, 'var(--antd-arrow-background-color)', '', false),
  ];
};

// ============================== Export ==============================
export default (prefixCls: string, injectStyle: boolean): UseComponentStyleResult => {
  const useOriginHook = genComponentStyleHook(
    'Tooltip',
    token => {
      // Popover use Tooltip as internal component. We do not need to handle this.
      if (injectStyle === false) {
        return [];
      }

      const { radiusBase, colorTextLightSolid, colorBgContainerWeak } = token;

      const tooltipBg = colorBgContainerWeak;

      const TooltipToken = mergeToken<TooltipToken>(token, {
        // default variables
        tooltipMaxWidth: 250,
        tooltipColor: colorTextLightSolid,
        tooltipBg,
        tooltipBorderRadius: radiusBase,
      });

      return [genTooltipStyle(TooltipToken)];
    },
    ({ zIndexPopupBase }) => ({
      zIndexPopup: zIndexPopupBase + 70,
    }),
  );

  return useOriginHook(prefixCls);
};
