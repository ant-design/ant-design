import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 头像尺寸
   * @descEN Size of Avatar
   */
  containerSize: number;
  /**
   * @desc 大号头像尺寸
   * @descEN Size of large Avatar
   */
  containerSizeLG: number;
  /**
   * @desc 小号头像尺寸
   * @descEN Size of small Avatar
   */
  containerSizeSM: number;
  /**
   * @desc 头像文字大小
   * @descEN Font size of Avatar
   */
  textFontSize: number;
  /**
   * @desc 大号头像文字大小
   * @descEN Font size of large Avatar
   */
  textFontSizeLG: number;
  /**
   * @desc 小号头像文字大小
   * @descEN Font size of small Avatar
   */
  textFontSizeSM: number;
  /**
   * @desc 头像图标大小
   * @descEN Font size of Avatar icon
   */
  iconFontSize: number;
  /**
   * @desc 大号头像图标大小
   * @descEN Font size of large Avatar icon
   */
  iconFontSizeLG: number;
  /**
   * @desc 小号头像图标大小
   * @descEN Font size of small Avatar icon
   */
  iconFontSizeSM: number;
  /**
   * @desc 头像组间距
   * @descEN Spacing between avatars in a group
   */
  groupSpace: number;
  /**
   * @desc 头像组重叠宽度
   * @descEN Overlapping of avatars in a group
   */
  groupOverlapping: number;
  /**
   * @desc 头像组边框颜色
   * @descEN Border color of avatars in a group
   */
  groupBorderColor: string;
}

/**
 * @desc Avatar 组件的 Token
 * @descEN Token for Avatar component
 */
type AvatarToken = FullToken<'Avatar'> & {
  avatarBgColor: string;
  avatarBg: string;
  avatarColor: string;
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
    textFontSize,
    textFontSizeLG,
    textFontSizeSM,
    iconFontSize,
    iconFontSizeLG,
    iconFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType,
  } = token;

  // Avatar size style
  const avatarSizeStyle = (
    size: number,
    fontSize: number,
    iconFontSize: number,
    radius: number,
  ): CSSObject => ({
    width: size,
    height: size,
    borderRadius: '50%',
    fontSize,

    [`&${componentCls}-square`]: {
      borderRadius: radius,
    },

    [`&${componentCls}-icon`]: {
      fontSize: iconFontSize,
      [`> ${iconCls}`]: {
        margin: 0,
      },
    },
  });

  return {
    [componentCls]: {
      ...resetComponent(token),
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      color: avatarColor,
      whiteSpace: 'nowrap',
      textAlign: 'center',
      verticalAlign: 'middle',
      background: avatarBg,
      border: `${unit(lineWidth)} ${lineType} transparent`,

      '&-image': {
        background: 'transparent',
      },

      [`${antCls}-image-img`]: {
        display: 'block',
      },

      ...avatarSizeStyle(containerSize, textFontSize, iconFontSize, borderRadius),

      '&-lg': {
        ...avatarSizeStyle(containerSizeLG, textFontSizeLG, iconFontSizeLG, borderRadiusLG),
      },

      '&-sm': {
        ...avatarSizeStyle(containerSizeSM, textFontSizeSM, iconFontSizeSM, borderRadiusSM),
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

      [componentCls]: {
        borderColor: groupBorderColor,
      },

      '> *:not(:first-child)': {
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

export const prepareComponentToken: GetDefaultToken<'Avatar'> = (token) => {
  const {
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
  } = token;

  return {
    containerSize: controlHeight,
    containerSizeLG: controlHeightLG,
    containerSizeSM: controlHeightSM,
    textFontSize: fontSize,
    textFontSizeLG: fontSize,
    textFontSizeSM: fontSize,
    iconFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
    iconFontSizeLG: fontSizeHeading3,
    iconFontSizeSM: fontSize,
    groupSpace: marginXXS,
    groupOverlapping: -marginXS,
    groupBorderColor: colorBorderBg,
  };
};

export default genStyleHooks(
  'Avatar',
  (token) => {
    const { colorTextLightSolid, colorTextPlaceholder } = token;
    const avatarToken = mergeToken<AvatarToken>(token, {
      avatarBg: colorTextPlaceholder,
      avatarColor: colorTextLightSolid,
    });
    return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
  },
  prepareComponentToken,
);
