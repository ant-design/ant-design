// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';

export interface ComponentToken {}

type AvatarToken = FullToken<'Avatar'> & {
  avatarBg: string;
  avatarColor: string;
  avatarSizeBase: number;
  avatarSizeLG: number;
  avatarSizeSM: number;
  avatarFontSizeBase: number;
  avatarFontSizeLG: number;
  avatarFontSizeSM: number;
  avatarBorderRadius: number;
  avatarGroupBorderColor: string;
  avatarGroupOverlapping: number;
  avatarGroupSpace: number;
};

const genBaseStyle: GenerateStyle<AvatarToken> = token => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    avatarSizeBase,
    avatarSizeLG,
    avatarSizeSM,
    avatarFontSizeBase,
    avatarFontSizeLG,
    avatarFontSizeSM,
    avatarBorderRadius,
    lineWidth,
    lineType,
  } = token;

  // Avatar size style
  const avatarSizeStyle = (size: number, fontSize: number): CSSObject => ({
    width: size,
    height: size,
    lineHeight: `${size - lineWidth * 2}px`,
    borderRadius: '50%',

    [`${componentCls}-string`]: {
      position: 'absolute',
      left: {
        _skip_check_: true,
        value: '50%',
      },
      transformOrigin: '0 center',
    },

    [`&${componentCls}-icon`]: {
      fontSize,
      [`> ${iconCls}`]: {
        margin: 0,
      },
    },
  });

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-block',
      overflow: 'hidden',
      color: avatarColor,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
      background: avatarBg,
      border: `${lineWidth}px ${lineType} transparent`,

      [`&-image`]: {
        background: 'transparent',
      },

      [`${antCls}-image-img`]: {
        display: 'block',
      },

      ...avatarSizeStyle(avatarSizeBase, avatarFontSizeBase),

      [`&-lg`]: {
        ...avatarSizeStyle(avatarSizeLG, avatarFontSizeLG),
      },

      [`&-sm`]: {
        ...avatarSizeStyle(avatarSizeSM, avatarFontSizeSM),
      },

      [`&-square`]: {
        borderRadius: avatarBorderRadius,
      },

      '> img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
  };
};

const genGroupStyle: GenerateStyle<AvatarToken> = token => {
  const { componentCls, avatarGroupBorderColor, avatarGroupOverlapping, avatarGroupSpace } = token;

  return {
    [`${componentCls}-group`]: {
      display: 'inline-flex',

      [`${componentCls}`]: {
        borderColor: avatarGroupBorderColor,

        [`&:not(:first-child)`]: {
          marginInlineStart: -avatarGroupOverlapping,
        },
      },

      [`&-popover`]: {
        [`${componentCls} + ${componentCls}`]: {
          marginInlineStart: avatarGroupSpace,
        },
      },
    },
  };
};

export default genComponentStyleHook('Avatar', token => {
  const {
    colorPlaceholder,
    colorTextLightSolid,
    colorBg,

    controlHeight,
    controlHeightLG,
    controlHeightSM,

    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,

    marginXS,
  } = token;

  const avatarToken = mergeToken<AvatarToken>(token, {
    avatarBg: colorPlaceholder,
    avatarColor: colorTextLightSolid,

    avatarSizeBase: controlHeight,
    avatarSizeLG: controlHeightLG,
    avatarSizeSM: controlHeightSM,

    avatarFontSizeBase: Math.round((fontSizeLG + fontSizeXL) / 2),
    avatarFontSizeLG: fontSizeHeading3,
    avatarFontSizeSM: fontSize,
    avatarBorderRadius: token.radiusBase,
    avatarGroupBorderColor: colorBg,
    avatarGroupOverlapping: marginXS,
    avatarGroupSpace: marginXS,
  });

  return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
});
