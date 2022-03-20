// import '../../style/index.less';
// import './index.less';

// style dependencies
// deps-lint-skip: tooltip

// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import {
  PresetColorKeys,
  PresetColorType,
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
  roundedArrow,
} from '../../_util/theme';

// FIXME
type PopoverToken = DerivativeToken & {
  popoverCls: string;
  iconPrefixCls: string,
  popoverBg: string;
  popoverColor: string;
  popoverMinWidth: number;
  popoverMinHeight: number;
  popoverArrowWidth: number;
  popoverArrowColor: string;
  popoverArrowOuterColor: string;
  popoverDistance: number;
  popoverPaddingHorizonta: number;
  popoverArrowRotateWidth: number;
  popoverArrowOffsetVertical: number;
  popoverArrowOffsetHorizontal: number;
};


const genBaseStyle: GenerateStyle<PopoverToken> = token => {
  const {
    popoverCls,
    iconPrefixCls,
    popoverBg,
    popoverColor,
    popoverMinWidth,
    popoverMinHeight,
    popoverArrowWidth,
    popoverPaddingHorizonta,
    popoverArrowRotateWidth,

    zIndexPopover,
    borderRadius,
    borderColorSplit,
    boxShadow,
    fontSize,
    headingColor,
    lineHeight,
    paddingSM,
    warningColor,
  } = token;

  return {
    [popoverCls]: {
      ...resetComponent(token),
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: zIndexPopover,
      fontWeight: 'normal',
      whiteSpace: 'normal',
      textAlign: 'start',
      cursor: 'auto',
      userSelect: 'text',

      '&::after': {
        position: 'absolute',
        background: new TinyColor('#fff').setAlpha(0.01).toRgbString(),
        content: '""',
      },

      '&-rtl': {
        direction: 'rtl',
      },

      '&-hidden': {
        display: 'none',
      },

      [`${popoverCls}-inner`]: {
        backgroundColor: popoverBg,
        backgroundClip: 'padding-box',
        borderRadius,
        boxShadow,
      },

      [`${popoverCls}-title`]: {
        minWidth: popoverMinWidth,
        minHeight: popoverMinHeight,
        margin: 0,
        padding: `5px ${popoverPaddingHorizonta}px 4px`,
        color: headingColor,
        fontWeight: 500,
        borderBottom: `1px solid ${borderColorSplit}`,
      },

      [`${popoverCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizonta}px`,
        color: popoverColor,
      },

      // FIXME 没找到使用地方，先保留
      '&-message': {
        position: 'relative',
        padding: '4px 0 12px',
        color: popoverColor,
        fontSize,

        [`> .${iconPrefixCls}`]: {
          position: 'absolute',
          top: 4 + ((lineHeight * fontSize - fontSize) / 2),
          color: warningColor,
          fontSize,
        },

        '&-title': {
          paddingInlineStart: fontSize + 8,
        },
      },

      // FIXME 没找到使用地方，先保留
      '&-buttons': {
        marginBottom: 4,
        textAlign: 'end',

        'button': {
          marginInlineStart: 8,
        },
      },

      [`${popoverCls}-arrow`]: {
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
          right: 0,
          bottom: 0,
          left: 0,
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
  }
};

const genPlacementStyle: GenerateStyle<PopoverToken> = token => {
  const {
    popoverCls,
    popoverDistance,
    popoverArrowRotateWidth,
    popoverArrowOffsetHorizontal,
    popoverArrowOffsetVertical,
  } = token;

  return {
    [popoverCls]: {
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
        paddingLeft: popoverDistance,
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
        paddingRight: popoverDistance,
      },

      [`
        &-placement-top ${popoverCls}-arrow,
        &-placement-topLeft ${popoverCls}-arrow,
        &-placement-topRight ${popoverCls}-arrow
      `]: {
        bottom: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateY(-${popoverArrowRotateWidth / 2}px) rotate(45deg)`,
        },
      },

      [`&-placement-top ${popoverCls}-arrow`]: {
        left: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-topLeft ${popoverCls}-arrow`]: {
        left: popoverArrowOffsetHorizontal,
      },

      [`&-placement-topRight ${popoverCls}-arrow`]: {
        right: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-right ${popoverCls}-arrow,
        &-placement-rightTop ${popoverCls}-arrow,
        &-placement-rightBottom ${popoverCls}-arrow
      `]: {
        left: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateX(${popoverArrowRotateWidth / 2}px) rotate(135deg)`,
        },
      },

      [`&-placement-right ${popoverCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-rightTop ${popoverCls}-arrow`]: {
        top: popoverArrowOffsetVertical,
      },

      [`&-placement-rightBottom ${popoverCls}-arrow`]: {
        bottom: popoverArrowOffsetVertical,
      },

      [`
        &-placement-bottom ${popoverCls}-arrow,
        &-placement-bottomLeft ${popoverCls}-arrow,
        &-placement-bottomRight ${popoverCls}-arrow
      `]: {
        top: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          boxShadow: `2px 2px 5px ${new TinyColor('#000').setAlpha(0.06).toRgbString()}`,
          transform: `translateY(${popoverArrowRotateWidth / 2}px) rotate(-135deg)`,
        },
      },

      [`&-placement-bottom ${popoverCls}-arrow`]: {
        left: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-bottomLeft ${popoverCls}-arrow`]: {
        left: popoverArrowOffsetHorizontal,
      },

      [`&-placement-bottomRight ${popoverCls}-arrow`]: {
        right: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-left ${popoverCls}-arrow,
        &-placement-leftTop ${popoverCls}-arrow,
        &-placement-leftBottom ${popoverCls}-arrow
      `]: {
        right: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateX(-${popoverArrowRotateWidth / 2}px) rotate(-45deg)`,
        },
      },

      [`&-placement-left ${popoverCls}-arrow`]: {
        top: '50%',
        transform: 'translateY(-50%)',
      },

      [`&-placement-leftTop ${popoverCls}-arrow`]: {
        top: popoverArrowOffsetVertical,
      },

      [`&-placement-leftBottom ${popoverCls}-arrow`]: {
        bottom: popoverArrowOffsetVertical,
      },
    },
  }
};

// FIXME: special preset colors
const genColorStyle: GenerateStyle<PopoverToken> = token => {
  const { popoverCls } = token;

  return PresetColorKeys.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
    const lightColor = token[`${colorKey}-6`];
    return {
      ...prev,
      [`${popoverCls}-${colorKey}`]: {
        [`${popoverCls}-inner`]: {
          backgroundColor: lightColor,
        },
        [`${popoverCls}-arrow`]: {
          '&-content': {
            backgroundColor: lightColor,
          },
        },
      },
    };
  }, {} as CSSObject);
};

export const genPopoverStyle: GenerateStyle<PopoverToken> = (token: PopoverToken): CSSInterpolation => [
  genBaseStyle(token),
  genPlacementStyle(token),
  genColorStyle(token),
];

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const popoverBg = token.componentBackground;
  // FIXME
  const popoverArrowWidth = 8 * Math.sqrt(2);

  const popoverToken = {
    ...token,
    popoverCls: `.${prefixCls}`,
    iconPrefixCls,
    popoverBg,
    popoverColor: token.textColor,
    // FIXME
    popoverMinWidth: 177,
    popoverMinHeight: 32,
    popoverArrowWidth,
    popoverArrowColor: popoverBg,
    popoverArrowOuterColor: popoverBg,
    popoverDistance: popoverArrowWidth + 4,
    popoverPaddingHorizonta: token.padding,
    popoverArrowRotateWidth: Math.sqrt(popoverArrowWidth * popoverArrowWidth * 2),
    // FIXME
    popoverArrowOffsetVertical: 12,
    popoverArrowOffsetHorizontal: 16,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genPopoverStyle(popoverToken),
    ]),
    hashId,
  ];
}
