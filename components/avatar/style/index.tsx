// import '../../style/index.less';
// import './index.less';

// // style dependencies
// // deps-lint-skip: grid
// import '../../popover/style';

// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
} from '../../_util/theme';

import { genPopoverStyle } from '../../popover/style';

type AvatarToken = DerivativeToken & {
  antPrefixCls: string;
  avatarCls: string;
  iconPrefixCls: string;
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
}

const avatarSizeStyle = (
  avatarCls: string,
  iconPrefixCls: string,
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
    [`> .${iconPrefixCls}`]: {
      margin: 0,
    },
  },
});

const genBaseStyle: GenerateStyle<AvatarToken> = token => {
  const {
    antPrefixCls,
    avatarCls,
    iconPrefixCls,
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
    [avatarCls]: {
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

      [`.${antPrefixCls}-image-img`]: {
        display: 'block',
      },

      ...avatarSizeStyle(avatarCls, iconPrefixCls, avatarSizeBase, avatarFontSizeBase),

      [`&-lg`]: {
        ...avatarSizeStyle(avatarCls, iconPrefixCls, avatarSizeLG, avatarFontSizeLG),
      },

      [`&-sm`]: {
        ...avatarSizeStyle(avatarCls, iconPrefixCls, avatarSizeSM, avatarFontSizeSM),
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
  const {
    avatarCls,
    avatarGroupBorderColor,
    avatarGroupOverlapping,
    avatarGroupSpace,
  } = token;

  return {
    [`${avatarCls}-group`]: {
      display: 'inline-flex',

      [`${avatarCls}`]: {
        border: `1px solid ${avatarGroupBorderColor}`,

        [`&:not(:first-child)`]: {
          marginInlineStart: avatarGroupOverlapping,
        },
      },

      [`&-popover`]: {
        [`${avatarCls} + ${avatarCls}`]: {
          marginInlineStart: avatarGroupSpace,
        },
      },
    },
  };
};

export const genAvatarStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  antPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const avatarCls = `.${prefixCls}`;

  const avatarToken: AvatarToken = {
    ...token,
    antPrefixCls,
    iconPrefixCls,
    avatarCls,
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
};

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
  antPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genPopoverStyle(`${prefixCls}-popover`, iconPrefixCls, token),
      genAvatarStyle(prefixCls, iconPrefixCls, antPrefixCls, token),
    ]),
    hashId,
  ];
};
