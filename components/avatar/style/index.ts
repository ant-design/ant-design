import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  avatarBg: string;
  avatarColor: string;
  containerSize: number;
  containerSizeLG: number;
  containerSizeSM: number;
  fontSize: number;
  fontSizeLG: number;
  fontSizeSM: number;
  groupSpace: number;
  groupOverlapping: number;
  groupBorderColor: string;
}

type AvatarToken = FullToken<'Avatar'> & {
  avatarGroupOverlapping: number;
  avatarBgColor: string;
};

const genBaseStyle: GenerateStyle<AvatarToken> = (token) => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    containerSize,
    containerSizeLG,
    containerSizeSM,
    fontSizeLG,
    fontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType,
  } = token;

  // Avatar size style
  const avatarSizeStyle = (size: number, fontSize: number, radius: number): CSSObject => ({
    width: size,
    height: size,
    lineHeight: `${size - lineWidth * 2}px`,
    borderRadius: '50%',

    [`&${componentCls}-square`]: {
      borderRadius: radius,
    },

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

      ...avatarSizeStyle(containerSize, token.fontSize, borderRadius),

      [`&-lg`]: {
        ...avatarSizeStyle(containerSizeLG, fontSizeLG, borderRadiusLG),
      },

      [`&-sm`]: {
        ...avatarSizeStyle(containerSizeSM, fontSizeSM, borderRadiusSM),
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

const genGroupStyle: GenerateStyle<AvatarToken> = (token) => {
  const { componentCls, groupBorderColor, groupOverlapping, groupSpace } = token;

  return {
    [`${componentCls}-group`]: {
      display: 'inline-flex',

      [`${componentCls}`]: {
        borderColor: groupBorderColor,
      },

      [`> *:not(:first-child)`]: {
        marginInlineStart: groupOverlapping,
      },
    },
    [`${componentCls}-group-popover`]: {
      [`${componentCls} + ${componentCls}`]: {
        marginInlineStart: groupSpace,
      },
    },
  };
};

export default genComponentStyleHook(
  'Avatar',
  (token) => {
    const avatarToken = mergeToken<AvatarToken>(token, {});
    console.log([genBaseStyle(avatarToken), genGroupStyle(avatarToken)]);
    return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
  },
  (token) => {
    const {
      colorTextLightSolid,

      controlHeight,
      controlHeightLG,
      controlHeightSM,

      fontSize,
      fontSizeLG,
      fontSizeXL,
      fontSizeHeading3,

      marginXS,
      marginXXS,
      colorBorderBg,
      colorTextPlaceholder,
    } = token;
    return {
      containerSize: controlHeight,
      containerSizeLG: controlHeightLG,
      containerSizeSM: controlHeightSM,

      fontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
      fontSizeLG: fontSizeHeading3,
      fontSizeSM: fontSize,

      avatarBg: colorTextPlaceholder,
      avatarColor: colorTextLightSolid,
      groupSpace: marginXXS,
      groupOverlapping: -marginXS,
      groupBorderColor: colorBorderBg,
    };
  },
);
