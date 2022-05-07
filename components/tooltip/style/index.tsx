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

  const tooltipBgColor = new TinyColor(tooltipBg);

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
        minWidth: 30, // FIXME: hardcode in v4
        minHeight: 32, // FIXME: hardcode in v4
        padding: '6px 8px', // FIXME: hardcode in v4
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

      // Arrows
      [`${componentCls}-arrow`]: {
        position: 'absolute',
        zIndex: 2,
        display: 'block',
        width: tooltipArrowRotateWidth,
        height: tooltipArrowRotateWidth,
        overflow: 'hidden',
        background: 'transparent',
        pointerEvents: 'none',

        '&-content': {
          '--antd-arrow-background-color': `linear-gradient(to right bottom, ${new TinyColor(
            tooltipBgColor,
          ).setAlpha(tooltipBgColor.getAlpha() - 0.1)}, ${tooltipBg})`,
          position: 'absolute',
          top: 0, // FIXME: hardcode in v4
          insetInlineEnd: 0, // FIXME: hardcode in v4
          bottom: 0, // FIXME: hardcode in v4
          insetInlineStart: 0, // FIXME: hardcode in v4
          display: 'block',
          width: tooltipArrowWidth,
          height: tooltipArrowWidth,
          margin: 'auto',
          backgroundColor: 'transparent',
          content: '""',
          pointerEvents: 'auto',
          ...roundedArrow(tooltipArrowWidth, 5, 'var(--antd-arrow-background-color)'), // FIXME: hardcode in v4
        },
      },

      [`&-placement-top ${componentCls}-arrow,
        &-placement-topLeft ${componentCls}-arrow,
        &-placement-topRight ${componentCls}-arrow`]: {
        bottom: 0, // FIXME: hardcode in v4
        transform: 'translateY(100%)',

        '&-content': {
          boxShadow: `${tooltipArrowShadowWidth}px ${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`, // FIXME: hardcode in v4
          transform: `translateY(${-tooltipArrowRotateWidth / 2}px) rotate(45deg)`, // FIXME: hardcode in v4
        },
      },

      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%', // FIXME: hardcode in v4
        },
        transform: 'translateX(-50%) translateY(100%)',
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

      [`&-placement-right ${componentCls}-arrow,
        &-placement-rightTop ${componentCls}-arrow,
        &-placement-rightBottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: 0, // FIXME: hardcode in v4
        },
        transform: 'translateX(-100%)',

        '&-content': {
          boxShadow: `-${tooltipArrowShadowWidth}px ${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`, // FIXME: hardcode in v4
          transform: `translateX(${tooltipArrowRotateWidth / 2}px) rotate(135deg)`, // FIXME: hardcode in v4
        },
      },

      [`&-placement-right ${componentCls}-arrow`]: {
        top: '50%', // FIXME: hardcode in v4
        transform: 'translateX(-100%) translateY(-50%)', // FIXME: hardcode in v4
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
            value: 0, // FIXME: hardcode in v4
          },
          transform: 'translateX(100%)',

          '&-content': {
            boxShadow: `${tooltipArrowShadowWidth}px -${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`, // FIXME: hardcode in v4
            transform: `translateX(${-tooltipArrowRotateWidth / 2}px) rotate(315deg)`, // FIXME: hardcode in v4
          },
        },

      [`&-placement-left ${componentCls}-arrow`]: {
        top: '50%', // FIXME: hardcode in v4
        transform: 'translateX(100%) translateY(-50%)', // FIXME: hardcode in v4
      },

      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: tooltipArrowOffsetVertical,
      },

      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: tooltipArrowOffsetVertical,
      },

      [`&-placement-bottom ${componentCls}-arrow, &-placement-bottomLeft ${componentCls}-arrow, &-placement-bottomRight ${componentCls}-arrow`]:
        {
          top: 0, // FIXME: hardcode in v4
          transform: 'translateY(-100%)',

          '&-content': {
            boxShadow: `-${tooltipArrowShadowWidth}px -${tooltipArrowShadowWidth}px 7px ${tooltipShadowColor}`, // FIXME: hardcode in v4
            transform: `translateY(${tooltipArrowRotateWidth / 2}px) rotate(225deg)`, // FIXME: hardcode in v4
          },
        },

      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: '50%', // FIXME: hardcode in v4
        },
        transform: 'translateY(-100%) translateX(-50%)', // FIXME: hardcode in v4
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
  const { radiusBase, zIndexPopup } = token;
  const tooltipArrowShadowWidth = 3; // FIXME: hardcode in v4
  const tooltipArrowWidth = 8 * Math.sqrt(2); // FIXME: hardcode in v4
  const tooltipShadowColor = new TinyColor('#000').setAlpha(0.07).toRgbString(); // FIXME: hardcode in v4
  const tooltipBg = new TinyColor('#000').setAlpha(0.75).toRgbString(); // FIXME: hardcode in v4
  const tooltipArrowRotateWidth =
    Math.sqrt(tooltipArrowWidth * tooltipArrowWidth * 2) + tooltipArrowShadowWidth * 2; // FIXME: hardcode in v4

  const TooltipToken = mergeToken<TooltipToken>(token, {
    // default variables
    tooltipMaxWidth: 250, // FIXME: hardcode in v4
    tooltipColor: '#fff', // FIXME: hardcode in v4
    tooltipBg,
    tooltipArrowWidth,
    tooltipDistance: tooltipArrowWidth - 1 + 4, // FIXME: hardcode in v4
    tooltipArrowColor: tooltipBg,
    tooltipBorderRadius: radiusBase,
    // component variables
    tooltipShadowColor,
    tooltipArrowShadowWidth,
    tooltipArrowRotateWidth,
    tooltipArrowOffsetVertical: 5, // FIXME: hardcode in v4
    tooltipArrowOffsetHorizontal: 13, // FIXME: hardcode in v4
    zIndexTooltip: zIndexPopup + 70, // FIXME: hardcode in v4
  });

  return [genTooltipStyle(TooltipToken)];
});
