// import '../../style/index.less';
// import './index.less';

// // style dependencies
// // deps-lint-skip: grid
// import '../../popover/style';

// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { GenerateStyle, resetComponent, FullToken, genComponentStyleHook } from '../../_util/theme';

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

const avatarSizeStyle = (
  avatarCls: string,
  iconCls: string,
  size: number,
  fontSize: number,
): CSSObject => ({
  width: size,
  height: size,
  lineHeight: `${size}px`,
  borderRadius: '50%',

  [`${avatarCls}-string`]: {
    position: 'absolute',
    insetInlineStart: '50%',
    transformOrigin: '0 center',
  },

  [`&${avatarCls}-icon`]: {
    fontSize,
    [`> ${iconCls}`]: {
      margin: 0,
    },
  },
});

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
  } = token;

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

      [`&-image`]: {
        background: 'transparent',
      },

      [`${antCls}-image-img`]: {
        display: 'block',
      },

      ...avatarSizeStyle(componentCls, iconCls, avatarSizeBase, avatarFontSizeBase),

      [`&-lg`]: {
        ...avatarSizeStyle(componentCls, iconCls, avatarSizeLG, avatarFontSizeLG),
      },

      [`&-sm`]: {
        ...avatarSizeStyle(componentCls, iconCls, avatarSizeSM, avatarFontSizeSM),
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
        border: `1px solid ${avatarGroupBorderColor}`,

        [`&:not(:first-child)`]: {
          marginInlineStart: avatarGroupOverlapping,
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
  const avatarToken: AvatarToken = {
    ...token,
    // FIXME
    avatarBg: '#ccc',
    // FIXME
    avatarColor: '#fff',
    // FIXME
    avatarSizeBase: 32,
    avatarSizeLG: 40,
    avatarSizeSM: 24,
    avatarFontSizeBase: 18,
    avatarFontSizeLG: 24,
    avatarFontSizeSM: 14,
    avatarBorderRadius: token.radiusBase,
    // FIXME
    avatarGroupBorderColor: '#fff',
    avatarGroupOverlapping: -8,
    avatarGroupSpace: 3,
  };

  return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
});
