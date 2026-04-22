import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { ArrowOffsetToken } from '../../style/placementArrow';
import { getArrowOffsetToken } from '../../style/placementArrow';
import type { ArrowToken } from '../../style/roundedArrow';
import { getArrowToken } from '../../style/roundedArrow';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genPresetColor, genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export interface ComponentToken extends ArrowOffsetToken, ArrowToken {
  /**
   * @desc 提示最大宽度
   * @descEN Maximum tooltip width
   */
  maxWidth: number;
  /**
   * @desc 提示 z-index
   * @descEN z-index of tooltip
   */
  zIndexPopup: number;
}

interface TextTooltipToken extends FullToken<'TextTooltip'> {
  tooltipBg: string;
  tooltipColor: string;
  tooltipBorderRadius: number;
}

const genPlacementStyle = (token: TextTooltipToken): CSSObject => {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    arrowOffsetHorizontal,
    arrowOffsetVertical,
    calc,
  } = token;

  const popupGap = calc(sizePopupArrow).div(2).add(marginXXS).equal();
  const sideArrowOffset = calc(sizePopupArrow).div(4).equal();

  return {
    [`&${componentCls}-placement-top`]: {
      '&::before': {
        left: '50%',
        bottom: `calc(100% + ${popupGap})`,
        transform: 'translate(-50%, 0)',
      },
      '&::after': {
        left: '50%',
        bottom: `calc(100% + ${marginXXS})`,
        transform: 'translate(-50%, 0) rotate(180deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(-50%, 0)' },
        '&::after': { transform: 'translate(-50%, 0) rotate(180deg)' },
      },
    },
    [`&${componentCls}-placement-topLeft`]: {
      '&::before': { left: 0, bottom: `calc(100% + ${popupGap})`, transform: 'translateY(0)' },
      '&::after': {
        left: arrowOffsetHorizontal,
        bottom: `calc(100% + ${marginXXS})`,
        transform: 'translateY(0) rotate(180deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(180deg)' },
      },
    },
    [`&${componentCls}-placement-topRight`]: {
      '&::before': { right: 0, bottom: `calc(100% + ${popupGap})`, transform: 'translateY(0)' },
      '&::after': {
        right: arrowOffsetHorizontal,
        bottom: `calc(100% + ${marginXXS})`,
        transform: 'translateY(0) rotate(180deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(180deg)' },
      },
    },
    [`&${componentCls}-placement-bottom`]: {
      '&::before': {
        left: '50%',
        top: `calc(100% + ${popupGap})`,
        transform: 'translate(-50%, 0)',
      },
      '&::after': {
        left: '50%',
        top: `calc(100% + ${marginXXS})`,
        transform: 'translate(-50%, 0)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(-50%, 0)' },
        '&::after': { transform: 'translate(-50%, 0)' },
      },
    },
    [`&${componentCls}-placement-bottomLeft`]: {
      '&::before': { left: 0, top: `calc(100% + ${popupGap})`, transform: 'translateY(0)' },
      '&::after': {
        left: arrowOffsetHorizontal,
        top: `calc(100% + ${marginXXS})`,
        transform: 'translateY(0)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0)' },
      },
    },
    [`&${componentCls}-placement-bottomRight`]: {
      '&::before': { right: 0, top: `calc(100% + ${popupGap})`, transform: 'translateY(0)' },
      '&::after': {
        right: arrowOffsetHorizontal,
        top: `calc(100% + ${marginXXS})`,
        transform: 'translateY(0)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0)' },
      },
    },
    [`&${componentCls}-placement-left`]: {
      '&::before': {
        right: `calc(100% + ${popupGap})`,
        top: '50%',
        transform: 'translate(0, -50%)',
      },
      '&::after': {
        right: '100%',
        top: '50%',
        transform: 'translate(0, -50%) rotate(90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(0, -50%)' },
        '&::after': { transform: 'translate(0, -50%) rotate(90deg)' },
      },
    },
    [`&${componentCls}-placement-leftTop`]: {
      '&::before': { right: `calc(100% + ${popupGap})`, top: 0, transform: 'translateX(0)' },
      '&::after': {
        right: '100%',
        top: `calc(${arrowOffsetVertical} + ${sideArrowOffset})`,
        transform: 'translateX(0) rotate(90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(90deg)' },
      },
    },
    [`&${componentCls}-placement-leftBottom`]: {
      '&::before': { right: `calc(100% + ${popupGap})`, bottom: 0, transform: 'translateX(0)' },
      '&::after': {
        right: '100%',
        bottom: `calc(${arrowOffsetVertical} + ${sideArrowOffset})`,
        transform: 'translateX(0) rotate(90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(90deg)' },
      },
    },
    [`&${componentCls}-placement-right`]: {
      '&::before': {
        left: `calc(100% + ${popupGap})`,
        top: '50%',
        transform: 'translate(0, -50%)',
      },
      '&::after': {
        left: '100%',
        top: '50%',
        transform: 'translate(0, -50%) rotate(-90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(0, -50%)' },
        '&::after': { transform: 'translate(0, -50%) rotate(-90deg)' },
      },
    },
    [`&${componentCls}-placement-rightTop`]: {
      '&::before': { left: `calc(100% + ${popupGap})`, top: 0, transform: 'translateX(0)' },
      '&::after': {
        left: '100%',
        top: `calc(${arrowOffsetVertical} + ${sideArrowOffset})`,
        transform: 'translateX(0) rotate(-90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(-90deg)' },
      },
    },
    [`&${componentCls}-placement-rightBottom`]: {
      '&::before': { left: `calc(100% + ${popupGap})`, bottom: 0, transform: 'translateX(0)' },
      '&::after': {
        left: '100%',
        bottom: `calc(${arrowOffsetVertical} + ${sideArrowOffset})`,
        transform: 'translateX(0) rotate(-90deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(-90deg)' },
      },
    },
  };
};

const genStyle: GenerateStyle<TextTooltipToken> = (token) => {
  const {
    componentCls,
    colorTextLightSolid,
    tooltipBg,
    tooltipColor,
    tooltipBorderRadius,
    boxShadowSecondary,
    controlHeight,
    fontFamily,
    fontSize,
    lineHeight,
    maxWidth,
    motionDurationMid,
    motionEaseOutCirc,
    paddingSM,
    paddingXS,
    sizePopupArrow,
    zIndexPopup,
    antCls,
    arrowPath,
    arrowPolygon,
  } = token;

  const [varName, varRef] = genCssVar(antCls, 'text-tooltip');
  const arrowHeight = token.calc(sizePopupArrow).div(2).equal();

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-flex',
      maxWidth: '100%',
      verticalAlign: 'top',
      [varName('background')]: tooltipBg,
      [varName('arrow-background')]: tooltipBg,
      [varName('text-color')]: tooltipColor,
      [varName('max-width')]: unit(maxWidth),
      [varName('z-index')]: zIndexPopup,
      [varName('box-shadow')]: boxShadowSecondary,
      [varName('border-radius')]: unit(tooltipBorderRadius),
      [varName('padding')]: `${unit(token.calc(paddingSM).div(2).equal())} ${unit(paddingXS)}`,

      '&::before, &::after': {
        position: 'absolute',
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        zIndex: varRef('z-index', zIndexPopup),
        transition: `opacity ${motionDurationMid} ${motionEaseOutCirc}, visibility ${motionDurationMid}`,
      },

      '&::before': {
        content: 'attr(data-text-tooltip)',
        display: 'block',
        minHeight: controlHeight,
        width: 'max-content',
        maxWidth: varRef('max-width', unit(maxWidth)),
        padding: varRef('padding'),
        color: varRef('text-color', colorTextLightSolid),
        fontFamily,
        fontSize,
        lineHeight,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        textAlign: 'start',
        background: varRef('background', tooltipBg),
        borderRadius: varRef('border-radius', unit(tooltipBorderRadius)),
        boxShadow: varRef('box-shadow', boxShadowSecondary),
        boxSizing: 'border-box',
        transition: `opacity ${motionDurationMid} ${motionEaseOutCirc}, visibility ${motionDurationMid}`,
      },

      '&::after': {
        content: '""',
        display: 'block',
        width: sizePopupArrow,
        height: arrowHeight,
        background: varRef('arrow-background', tooltipBg),
        clipPath: {
          _multi_value_: true,
          value: [arrowPolygon, arrowPath],
        },
      },

      [`&${componentCls}-open`]: {
        '&::before, &::after': {
          opacity: 1,
          visibility: 'visible',
        },
      },

      [`&${componentCls}-no-arrow`]: {
        '&::after': {
          display: 'none',
        },
      },

      ...genPlacementStyle(token),

      ...genPresetColor(token, (colorKey, { darkColor }) => ({
        [`&${componentCls}-${colorKey}`]: {
          [varName('background')]: darkColor,
          [varName('arrow-background')]: darkColor,
          [varName('text-color')]: colorTextLightSolid,
        },
      })),
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'TextTooltip'> = (token) => ({
  maxWidth: 250,
  zIndexPopup: token.zIndexPopupBase + 70,
  ...getArrowOffsetToken({
    contentRadius: token.borderRadius,
    limitVerticalRadius: true,
  }),
  ...getArrowToken(
    mergeToken<TextTooltipToken>(token, {
      borderRadiusOuter: Math.min(token.borderRadiusOuter, 4),
    }),
  ),
});

export default genStyleHooks(
  'TextTooltip',
  (token) => {
    const mergedToken = mergeToken<TextTooltipToken>(token, {
      tooltipBg: token.colorBgSpotlight,
      tooltipColor: token.colorTextLightSolid,
      tooltipBorderRadius: token.borderRadius,
    });

    return [genStyle(mergedToken)];
  },
  prepareComponentToken,
);
