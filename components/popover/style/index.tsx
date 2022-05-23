// import '../../style/index.less';
// import './index.less';

// style dependencies
// deps-lint-skip: tooltip

// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle, PresetColorType } from '../../_util/theme';
import {
  genComponentStyleHook,
  mergeToken,
  PresetColors,
  resetComponent,
  roundedArrow,
} from '../../_util/theme';

// FIXME
type PopoverToken = FullToken<'Popover'> & {
  componentCls: string;
  popoverBg: string;
  popoverColor: string;
  popoverMinWidth: number;
  popoverMinHeight: number;
  popoverArrowWidth: number;
  popoverArrowColor: string;
  popoverArrowOuterColor: string;
  popoverDistance: number;
  popoverPaddingHorizontal: number;
  popoverArrowRotateWidth: number;
  popoverArrowOffsetVertical: number;
  popoverArrowOffsetHorizontal: number;
};

const genBaseStyle: GenerateStyle<PopoverToken> = token => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    popoverMinWidth,
    popoverMinHeight,
    popoverArrowWidth,
    popoverPaddingHorizontal,
    popoverArrowRotateWidth,

    boxShadow,
    colorSplit,
    colorTextHeading,
    radiusBase: borderRadius,
    paddingSM,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'absolute',
      top: 0,
      insetInlineStart: 0,
      zIndex: 1030, // FIXME: hardcode
      fontWeight: 'normal',
      whiteSpace: 'normal',
      textAlign: 'start',
      cursor: 'auto',
      userSelect: 'text',

      '&::after': {
        position: 'absolute',
        // FIXME
        background: new TinyColor('#fff').setAlpha(0.01).toRgbString(),
        content: '""',
      },

      '&-rtl': {
        direction: 'rtl',
      },

      '&-hidden': {
        display: 'none',
      },

      [`${componentCls}-inner`]: {
        backgroundColor: popoverBg,
        backgroundClip: 'padding-box',
        borderRadius,
        boxShadow,
      },

      [`${componentCls}-title`]: {
        minWidth: popoverMinWidth,
        minHeight: popoverMinHeight,
        margin: 0,
        // FIXME
        padding: `5px ${popoverPaddingHorizontal}px 4px`,
        color: colorTextHeading,
        fontWeight: 500,
        // FIXME
        borderBottom: `1px solid ${colorSplit}`,
      },

      [`${componentCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizontal}px`,
        color: popoverColor,
      },

      [`${componentCls}-arrow`]: {
        position: 'absolute',
        display: 'block',
        width: popoverArrowRotateWidth,
        height: popoverArrowRotateWidth,
        overflow: 'hidden',
        background: 'transparent',
        pointerEvents: 'none',

        '&-content': {
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          display: 'block',
          width: popoverArrowWidth,
          height: popoverArrowWidth,
          margin: 'auto',
          backgroundColor: popoverBg,
          content: '""',
          pointerEvents: 'auto',
          ...roundedArrow(popoverArrowWidth, 5, popoverBg),
        },
      },
    },
  };
};

const genPlacementStyle: GenerateStyle<PopoverToken> = token => {
  const {
    componentCls,
    popoverDistance,
    popoverArrowRotateWidth,
    popoverArrowOffsetHorizontal,
    popoverArrowOffsetVertical,
  } = token;

  return {
    [componentCls]: {
      [`
        &-placement-top,
        &-placement-topLeft,
        &-placement-topRight
      `]: {
        paddingBottom: popoverDistance,
      },

      [`
        &-placement-right,
        &-placement-rightTop,
        &-placement-rightBottom
      `]: {
        paddingInlineStart: popoverDistance,
      },

      [`
        &-placement-bottom,
        &-placement-bottomLeft,
        &-placement-bottomRight
      `]: {
        paddingTop: popoverDistance,
      },

      [`
        &-placement-left,
        &-placement-leftTop,
        &-placement-leftBottom
      `]: {
        paddingInlineEnd: popoverDistance,
      },

      [`
        &-placement-top ${componentCls}-arrow,
        &-placement-topLeft ${componentCls}-arrow,
        &-placement-topRight ${componentCls}-arrow
      `]: {
        bottom: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateY(-${popoverArrowRotateWidth / 2}px) rotate(45deg)`,
        },
      },

      [`&-placement-top ${componentCls}-arrow`]: {
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-topLeft ${componentCls}-arrow`]: {
        insetInlineStart: popoverArrowOffsetHorizontal,
      },

      [`&-placement-topRight ${componentCls}-arrow`]: {
        insetInlineEnd: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-right ${componentCls}-arrow,
        &-placement-rightTop ${componentCls}-arrow,
        &-placement-rightBottom ${componentCls}-arrow
      `]: {
        insetInlineStart: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateX(${popoverArrowRotateWidth / 2}px) rotate(135deg)`,
        },
      },

      [`&-placement-right ${componentCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: popoverArrowOffsetVertical,
      },

      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: popoverArrowOffsetVertical,
      },

      [`
        &-placement-bottom ${componentCls}-arrow,
        &-placement-bottomLeft ${componentCls}-arrow,
        &-placement-bottomRight ${componentCls}-arrow
      `]: {
        top: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
          boxShadow: `2px 2px 5px ${new TinyColor('#000').setAlpha(0.06).toRgbString()}`,
          transform: `translateY(${popoverArrowRotateWidth / 2}px) rotate(-135deg)`,
        },
      },

      [`&-placement-bottom ${componentCls}-arrow`]: {
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        insetInlineStart: popoverArrowOffsetHorizontal,
      },

      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        insetInlineEnd: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-left ${componentCls}-arrow,
        &-placement-leftTop ${componentCls}-arrow,
        &-placement-leftBottom ${componentCls}-arrow
      `]: {
        insetInlineEnd: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateX(-${popoverArrowRotateWidth / 2}px) rotate(-45deg)`,
        },
      },

      [`&-placement-left ${componentCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: popoverArrowOffsetVertical,
      },

      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: popoverArrowOffsetVertical,
      },
    },
  };
};

// FIXME: special preset colors
const genColorStyle: GenerateStyle<PopoverToken> = token => {
  const { componentCls } = token;

  return PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const lightColor = token[`${colorKey}-6`];
    return {
      ...prev,
      [`${componentCls}-${colorKey}`]: {
        [`${componentCls}-inner`]: {
          backgroundColor: lightColor,
        },
        [`${componentCls}-arrow`]: {
          '&-content': {
            backgroundColor: lightColor,
          },
        },
      },
    };
  }, {} as CSSObject);
};

export default genComponentStyleHook('Popover', token => {
  const popoverBg = token.colorBg;
  // FIXME
  const popoverArrowWidth = 8 * Math.sqrt(2);

  const popoverToken = mergeToken<PopoverToken>(token, {
    popoverBg,
    popoverColor: token.colorText,
    // FIXME
    popoverMinWidth: 177,
    popoverMinHeight: 32,
    popoverArrowWidth,
    popoverArrowColor: popoverBg,
    popoverArrowOuterColor: popoverBg,
    popoverDistance: popoverArrowWidth + 4,
    popoverPaddingHorizontal: token.padding,
    popoverArrowRotateWidth: Math.sqrt(popoverArrowWidth * popoverArrowWidth * 2),
    // FIXME
    popoverArrowOffsetVertical: 12,
    popoverArrowOffsetHorizontal: 16,
  });

  return [genBaseStyle(popoverToken), genPlacementStyle(popoverToken), genColorStyle(popoverToken)];
});
