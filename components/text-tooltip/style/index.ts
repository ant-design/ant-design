import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genPresetColor, genStyleHooks, mergeToken } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export interface ComponentToken {
  maxWidth: number;
  zIndexPopup: number;
}

interface TextTooltipToken extends FullToken<'TextTooltip'> {
  tooltipBg: string;
  tooltipColor: string;
  tooltipBorderRadius: number;
}

const genPlacementStyle = (token: TextTooltipToken): CSSObject => {
  const { componentCls, sizePopupArrow, marginXXS, paddingXS, calc } = token;

  const arrowSize = calc(sizePopupArrow).div(2).equal();
  const popupGap = calc(sizePopupArrow).div(2).add(marginXXS).equal();
  const edgeOffset = calc(paddingXS).add(calc(sizePopupArrow).div(2)).equal();

  return {
    [`&${componentCls}-placement-top`]: {
      '&::before': {
        left: '50%',
        bottom: `calc(100% + ${popupGap})`,
        transform: 'translate(-50%, 4px)',
      },
      '&::after': {
        left: '50%',
        bottom: `calc(100% + ${arrowSize})`,
        transform: 'translate(-50%, 4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(-50%, 0)' },
        '&::after': { transform: 'translate(-50%, 0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-topLeft`]: {
      '&::before': { left: 0, bottom: `calc(100% + ${popupGap})`, transform: 'translateY(4px)' },
      '&::after': {
        left: edgeOffset,
        bottom: `calc(100% + ${arrowSize})`,
        transform: 'translateY(4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-topRight`]: {
      '&::before': { right: 0, bottom: `calc(100% + ${popupGap})`, transform: 'translateY(4px)' },
      '&::after': {
        right: edgeOffset,
        bottom: `calc(100% + ${arrowSize})`,
        transform: 'translateY(4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-bottom`]: {
      '&::before': {
        left: '50%',
        top: `calc(100% + ${popupGap})`,
        transform: 'translate(-50%, -4px)',
      },
      '&::after': {
        left: '50%',
        top: `calc(100% + ${arrowSize})`,
        transform: 'translate(-50%, -4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(-50%, 0)' },
        '&::after': { transform: 'translate(-50%, 0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-bottomLeft`]: {
      '&::before': { left: 0, top: `calc(100% + ${popupGap})`, transform: 'translateY(-4px)' },
      '&::after': {
        left: edgeOffset,
        top: `calc(100% + ${arrowSize})`,
        transform: 'translateY(-4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-bottomRight`]: {
      '&::before': { right: 0, top: `calc(100% + ${popupGap})`, transform: 'translateY(-4px)' },
      '&::after': {
        right: edgeOffset,
        top: `calc(100% + ${arrowSize})`,
        transform: 'translateY(-4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateY(0)' },
        '&::after': { transform: 'translateY(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-left`]: {
      '&::before': {
        right: `calc(100% + ${popupGap})`,
        top: '50%',
        transform: 'translate(4px, -50%)',
      },
      '&::after': {
        right: `calc(100% + ${arrowSize})`,
        top: '50%',
        transform: 'translate(4px, -50%) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(0, -50%)' },
        '&::after': { transform: 'translate(0, -50%) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-leftTop`]: {
      '&::before': { right: `calc(100% + ${popupGap})`, top: 0, transform: 'translateX(4px)' },
      '&::after': {
        right: `calc(100% + ${arrowSize})`,
        top: edgeOffset,
        transform: 'translateX(4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-leftBottom`]: {
      '&::before': { right: `calc(100% + ${popupGap})`, bottom: 0, transform: 'translateX(4px)' },
      '&::after': {
        right: `calc(100% + ${arrowSize})`,
        bottom: edgeOffset,
        transform: 'translateX(4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-right`]: {
      '&::before': {
        left: `calc(100% + ${popupGap})`,
        top: '50%',
        transform: 'translate(-4px, -50%)',
      },
      '&::after': {
        left: `calc(100% + ${arrowSize})`,
        top: '50%',
        transform: 'translate(-4px, -50%) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translate(0, -50%)' },
        '&::after': { transform: 'translate(0, -50%) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-rightTop`]: {
      '&::before': { left: `calc(100% + ${popupGap})`, top: 0, transform: 'translateX(-4px)' },
      '&::after': {
        left: `calc(100% + ${arrowSize})`,
        top: edgeOffset,
        transform: 'translateX(-4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(45deg)' },
      },
    },
    [`&${componentCls}-placement-rightBottom`]: {
      '&::before': { left: `calc(100% + ${popupGap})`, bottom: 0, transform: 'translateX(-4px)' },
      '&::after': {
        left: `calc(100% + ${arrowSize})`,
        bottom: edgeOffset,
        transform: 'translateX(-4px) rotate(45deg)',
      },
      [`&${componentCls}-open`]: {
        '&::before': { transform: 'translateX(0)' },
        '&::after': { transform: 'translateX(0) rotate(45deg)' },
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
  } = token;

  const [varName, varRef] = genCssVar(antCls, 'text-tooltip');
  const arrowSize = token.calc(sizePopupArrow).div(2).equal();

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
        transition: `opacity ${motionDurationMid} ${motionEaseOutCirc}, transform ${motionDurationMid} ${motionEaseOutCirc}, visibility ${motionDurationMid}`,
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
      },

      '&::after': {
        content: '""',
        width: arrowSize,
        height: arrowSize,
        background: varRef('arrow-background', tooltipBg),
        boxShadow: varRef('box-shadow', boxShadowSecondary),
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
