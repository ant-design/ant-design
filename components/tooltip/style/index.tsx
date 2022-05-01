// deps-lint-skip-all
// import '../../style/index.less';
// import './index.less';
import { TinyColor } from '@ctrl/tinycolor';
import type { CSSObject } from '@ant-design/cssinjs';
import {
  genComponentStyleHook,
  mergeToken,
  resetComponent,
  roundedArrow,
  PresetColors,
} from '../../_util/theme';
import type { GenerateStyle, FullToken, PresetColorType } from '../../_util/theme';

export interface TooltipToken extends FullToken<'Tooltip'> {
  // default variables
  tooltipMaxWidth: number;
  tooltipColor: string;
  tooltipBg: string;
  tooltipArrowWidth: number;
  tooltipDistance: number;
  tooltipArrowColor: string;
  tooltipBorderRadius: number;
  // component variables
  tooltipArrowShadowWidth: number;
  tooltipArrowRotateWidth: number;
  tooltipArrowOffsetVertical: number;
  tooltipArrowOffsetHorizontal: number;
  zIndexTooltip: number;
  tooltipShadowColor: string;
}

const generatorTooltipPresetColor: GenerateStyle<TooltipToken, CSSObject> = token => {
  const { componentCls } = token;

  return PresetColors.reduce((previousValue: any, currentValue: keyof PresetColorType) => {
    const lightColor = token[`${currentValue}-6`];
    previousValue[`&${componentCls}-${currentValue}`] = {
      [`${componentCls}-inner`]: {
        backgroundColor: lightColor,
      },
      [`${componentCls}-arrow-content::before`]: {
        background: lightColor,
      },
    };
    return previousValue;
  }, {});
};

const genTooltipStyle: GenerateStyle<TooltipToken, CSSObject> = token => {
  const {
    componentCls, // ant-tooltip
    tooltipArrowOffsetHorizontal,
    tooltipArrowOffsetVertical,
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipArrowWidth,
    tooltipDistance,
    tooltipBorderRadius,
    tooltipShadowColor,
    tooltipArrowRotateWidth,
    tooltipArrowShadowWidth,
    zIndexTooltip,
    boxShadow,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'absolute',
      zIndex: zIndexTooltip,
      display: 'block',
      '&': [{ width: 'max-content' }, { width: 'intrinsic' }],
      maxWidth: tooltipMaxWidth,
      visibility: 'visible',
      '&-hidden': {
        display: 'none',
      },
      '&-placement-top, &-placement-topLeft, &-placement-topRight': {
        paddingBottom: tooltipDistance,
      },

      '&-placement-right, &-placement-rightTop, &-placement-rightBottom': {
        paddingLeft: {
          _skip_check_: true,
          value: tooltipDistance,
        },
      },

      '&-placement-bottom, &-placement-bottomLeft, &-placement-bottomRight': {
        paddingTop: tooltipDistance,
      },

      '&-placement-left, &-placement-leftTop, &-placement-leftBottom': {
        paddingRight: {
          _skip_check_: true,
          value: tooltipDistance,
        },
      },
      // Wrapper for the tooltip content
      [`${componentCls}-inner`]: {
        minWidth: 30,
        minHeight: 32,
        padding: '6px 8px',
        color: tooltipColor,
        textAlign: 'start',
        textDecoration: 'none',
        wordWrap: 'break-word',
        backgroundColor: tooltipBg,
        borderRadius: tooltipBorderRadius,
        boxShadow,
      },

      // Arrows
      [`${componentCls}-arrow`]: {
        position: 'absolute',
        display: 'block',
        width: tooltipArrowRotateWidth,
        height: tooltipArrowRotateWidth,
        overflow: 'hidden',
        background: 'transparent',
        pointerEvents: 'none',

        '&-content': {
          '--antd-arrow-background-color': tooltipBg,
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          display: 'block',
          width: tooltipArrowWidth,
          height: tooltipArrowWidth,
          margin: 'auto',
          backgroundColor: 'transparent',
          content: '""',
          pointerEvents: 'auto',
          ...roundedArrow(tooltipArrowWidth, 5, 'var(--antd-arrow-background-color)'),
        },
      },

      [`&-placement-top ${componentCls}-arrow, &-placement-topLeft ${componentCls}-arrow, &-placement-topRight ${componentCls}-arrow`]:
        {
          bottom: tooltipDistance - tooltipArrowRotateWidth + 0.24,

          '&-content': {
            boxShadow: `${tooltipArrowShadowWidth}px ${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`,
            transform: `translateY(${-tooltipArrowRotateWidth / 2}px) rotate(45deg)`,
          },
        },

      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%',
        },
        transform: 'translateX(-50%)',
      },

      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: tooltipArrowOffsetHorizontal,
        },
      },

      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: tooltipArrowOffsetHorizontal,
        },
      },

      [`&-placement-right ${componentCls}-arrow, &-placement-rightTop ${componentCls}-arrow, &-placement-rightBottom ${componentCls}-arrow`]:
        {
          left: {
            _skip_check_: true,
            value: tooltipDistance - tooltipArrowRotateWidth + 0.1,
          },
          '&-content': {
            boxShadow: `-${tooltipArrowShadowWidth}px ${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`,
            transform: `translateX(${tooltipArrowRotateWidth / 2}px) rotate(135deg)`,
          },
        },

      [`&-placement-right ${componentCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: tooltipArrowOffsetVertical,
      },

      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: tooltipArrowOffsetVertical,
      },

      [`&-placement-left ${componentCls}-arrow, &-placement-leftTop ${componentCls}-arrow, &-placement-leftBottom ${componentCls}-arrow`]:
        {
          right: {
            _skip_check_: true,
            value: tooltipDistance - tooltipArrowRotateWidth + 0.08,
          },

          '&-content': {
            boxShadow: `${tooltipArrowShadowWidth}px -${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`,
            transform: `translateX(${-tooltipArrowRotateWidth / 2}px) rotate(315deg)`,
          },
        },

      [`&-placement-left ${componentCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: tooltipArrowOffsetVertical,
      },

      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: tooltipArrowOffsetVertical,
      },

      [`&-placement-bottom ${componentCls}-arrow, &-placement-bottomLeft ${componentCls}-arrow, &-placement-bottomRight ${componentCls}-arrow`]:
        {
          top: tooltipDistance - tooltipArrowRotateWidth + 0.1,

          '&-content': {
            boxShadow: `-${tooltipArrowShadowWidth}px -${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`,
            transform: `translateY(${tooltipArrowRotateWidth / 2}px) rotate(225deg)`,
          },
        },

      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%',
        },
        transform: 'translateX(-50%)',
      },

      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: tooltipArrowOffsetHorizontal,
        },
      },

      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: tooltipArrowOffsetHorizontal,
        },
      },

      // generator for preset color
      ...generatorTooltipPresetColor(token),

      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Tooltip', token => {
  // console.log('@@@token:', token);

  const { radiusBase, zIndexPopup } = token;
  const tooltipArrowShadowWidth = 3;
  const tooltipArrowWidth = 8 * Math.sqrt(2);
  const tooltipShadowColor = new TinyColor('#000').setAlpha(0.07).toRgbString();
  const tooltipBg = new TinyColor('#000').setAlpha(0.75).toRgbString();
  const tooltipArrowRotateWidth =
    Math.sqrt(tooltipArrowWidth * tooltipArrowWidth * 2) + tooltipArrowShadowWidth * 2;

  const TooltipToken = mergeToken<TooltipToken>(token, {
    // default variables
    tooltipMaxWidth: 250,
    tooltipColor: '#fff',
    tooltipBg,
    tooltipArrowWidth,
    tooltipDistance: tooltipArrowWidth - 1 + 4,
    tooltipArrowColor: tooltipBg,
    tooltipBorderRadius: radiusBase,
    // component variables
    tooltipShadowColor,
    tooltipArrowShadowWidth,
    tooltipArrowRotateWidth,
    tooltipArrowOffsetVertical: 5,
    tooltipArrowOffsetHorizontal: 13,
    zIndexTooltip: zIndexPopup + 70,
  });

  return [genTooltipStyle(TooltipToken)];
});
