// import '../../style/index.less';
// import './index.less';

// style dependencies
// deps-lint-skip: tooltip

// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import {
  PresetColors,
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
  iconPrefixCls: string;
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

    boxShadow,
    colorSplit,
    colorTextHeading,
    colorWarning,
    fontSize,
    marginSM,
    marginXS,
    lineHeight,
    radiusBase: borderRadius,
    paddingSM,
    zIndexPopover,
  } = token;

  return {
    [popoverCls]: {
      ...resetComponent(token),
      position: 'absolute',
      top: 0,
      insetInlineStart: 0,
      zIndex: zIndexPopover,
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
        // FIXME
        padding: `5px ${popoverPaddingHorizonta}px 4px`,
        color: colorTextHeading,
        fontWeight: 500,
        // FIXME
        borderBottom: `1px solid ${colorSplit}`,
      },

      [`${popoverCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizonta}px`,
        color: popoverColor,
      },

      // FIXME 没找到使用地方，先保留
      '&-message': {
        position: 'relative',
        // FIXME
        padding: '4px 0 12px',
        color: popoverColor,
        fontSize,

        [`> .${iconPrefixCls}`]: {
          position: 'absolute',
          // FIXME
          top: 4 + (lineHeight * fontSize - fontSize) / 2,
          color: colorWarning,
          fontSize,
        },

        '&-title': {
          // FIXME
          paddingInlineStart: fontSize + 8,
        },
      },

      // FIXME 没找到使用地方，先保留
      '&-buttons': {
        marginBottom: marginXS,
        textAlign: 'end',

        button: {
          marginInlineStart: marginSM,
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
          // FIXME
          boxShadow: `3px 3px 7px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
          transform: `translateY(-${popoverArrowRotateWidth / 2}px) rotate(45deg)`,
        },
      },

      [`&-placement-top ${popoverCls}-arrow`]: {
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-topLeft ${popoverCls}-arrow`]: {
        insetInlineStart: popoverArrowOffsetHorizontal,
      },

      [`&-placement-topRight ${popoverCls}-arrow`]: {
        insetInlineEnd: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-right ${popoverCls}-arrow,
        &-placement-rightTop ${popoverCls}-arrow,
        &-placement-rightBottom ${popoverCls}-arrow
      `]: {
        insetInlineStart: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
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
          // FIXME
          boxShadow: `2px 2px 5px ${new TinyColor('#000').setAlpha(0.06).toRgbString()}`,
          transform: `translateY(${popoverArrowRotateWidth / 2}px) rotate(-135deg)`,
        },
      },

      [`&-placement-bottom ${popoverCls}-arrow`]: {
        insetInlineStart: '50%',
        transform: 'translateX(-50%)',
      },

      [`&-placement-bottomLeft ${popoverCls}-arrow`]: {
        insetInlineStart: popoverArrowOffsetHorizontal,
      },

      [`&-placement-bottomRight ${popoverCls}-arrow`]: {
        insetInlineEnd: popoverArrowOffsetHorizontal,
      },

      [`
        &-placement-left ${popoverCls}-arrow,
        &-placement-leftTop ${popoverCls}-arrow,
        &-placement-leftBottom ${popoverCls}-arrow
      `]: {
        insetInlineEnd: popoverDistance - popoverArrowRotateWidth,

        '&-content': {
          // FIXME
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
  };
};

// FIXME: special preset colors
const genColorStyle: GenerateStyle<PopoverToken> = token => {
  const { popoverCls } = token;

  return PresetColors.reduce((prev: CSSObject, colorKey: keyof PresetColorType) => {
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

export const genPopoverStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const popoverBg = token.colorBg;
  // FIXME
  const popoverArrowWidth = 8 * Math.sqrt(2);

  const popoverCls = `.${prefixCls}`;
  const popoverToken: PopoverToken = {
    ...token,
    popoverCls,
    iconPrefixCls,
    popoverBg,
    popoverColor: token.colorText,
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

  return [genBaseStyle(popoverToken), genPlacementStyle(popoverToken), genColorStyle(popoverToken)];
};

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genPopoverStyle(prefixCls, iconPrefixCls, token),
    ]),
    hashId,
  ];
}
