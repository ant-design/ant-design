// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';

import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';

const skeletonClsLoading = new Keyframes(`ant-skeleton-loading`, {
  '0%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0 50%',
  },
});

interface SkeletonToken extends DerivativeToken {
  skeletonCls: string;
  prefixCls: string;
  skeletonAvatarCls: string;
  skeletonTitleCls: string;
  skeletonParagraphCls: string;
  skeletonButtonCls: string;
  skeletonInputCls: string;
  skeletonImageCls: string;
  skeletonColor: string;
  skeletonToColor: string;
  avatarSizeBase: number;
  avatarSizeLg: number;
  avatarSizeSm: number;
  heightBase: number;
  heightLg: number;
  heightSm: number;
  imageSizeBase: number;
  imageFontSizeBase: number;
  skeletonTitleHeight: number;
  skeletonBlockRadius: number;
  marginLg: number;
  skeletonParagraphLiHeight: number;
  skeletonParagraphLiMarginTop: number;
  skeletonParagraphMarginTop: number;
  marginSm: number;
}

const genSkeletonElementCommonSize = (size: number): CSSObject => ({
  height: size,
  lineHeight: `${size}px`, // FIXME px
});

const genSkeletonElementAvatarSize = (size: number): CSSObject => ({
  width: size,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonColor = (token: SkeletonToken, hashId: string): CSSObject => {
  const { skeletonColor, skeletonToColor } = token;
  return {
    background: `linear-gradient(90deg, ${skeletonColor} 25%, ${skeletonToColor} 37%, ${skeletonColor} 63%)`,
    backgroundSize: '400% 100%',
    animation: `${skeletonClsLoading.getName(hashId)} 1.4s ease infinite`,
    skeletonClsLoading,
  };
};

const genSkeletonElementInputSize = (size: number): CSSObject => ({
  width: size * 5,
  minWidth: size * 5,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementAvatar = (token: SkeletonToken): CSSObject => {
  const { skeletonAvatarCls, skeletonColor, avatarSizeBase, avatarSizeLg, avatarSizeSm } = token;
  return {
    [`${skeletonAvatarCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: skeletonColor,
      ...genSkeletonElementAvatarSize(avatarSizeBase),
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: '50%',
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: {
      ...genSkeletonElementAvatarSize(avatarSizeLg),
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: {
      ...genSkeletonElementAvatarSize(avatarSizeSm),
    },
  };
};

const genSkeletonElementInput = (token: SkeletonToken): CSSObject => {
  const { heightBase, skeletonCls, heightLg, heightSm, skeletonColor } = token;
  return {
    display: 'inline-block',
    verticalAlign: 'top',
    background: skeletonColor,
    ...genSkeletonElementInputSize(heightBase),

    [`${skeletonCls}-lg`]: {
      ...genSkeletonElementInputSize(heightLg),
    },

    [`${skeletonCls}-sm`]: {
      ...genSkeletonElementInputSize(heightSm),
    },
  };
};

const genSkeletonElementImageSize = (token: SkeletonToken, size: number): CSSObject => {
  const { skeletonCls } = token;
  return {
    width: size,
    ...genSkeletonElementCommonSize(size),

    [`${skeletonCls}${skeletonCls}-circle`]: {
      borderRadius: '50%',
    },
  };
};

const genSkeletonElementImage = (token: SkeletonToken): CSSObject => {
  const { skeletonImageCls, imageSizeBase, skeletonColor } = token;
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'top',
    background: skeletonColor,
    ...genSkeletonElementImageSize(token, imageSizeBase * 2),

    [`${skeletonImageCls}-path`]: {
      fill: '#bfbfbf',
    },
    [`${skeletonImageCls}-svg`]: {
      ...genSkeletonElementImageSize(token, imageSizeBase),
      maxWidth: imageSizeBase * 4,
      maxHeight: imageSizeBase * 4,
    },
  };
};

const genSkeletonElementButtonSize = (size: number): CSSObject => ({
  width: size * 2,
  minWidth: size * 2,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementButton = (token: SkeletonToken): CSSObject => {
  const { radiusBase, skeletonButtonCls, heightBase, heightLg, heightSm, skeletonColor } = token;
  return {
    [`${skeletonButtonCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: skeletonColor,
      borderRadius: radiusBase,
      ...genSkeletonElementButtonSize(heightBase),
    },

    [`${skeletonButtonCls}-circle`]: {
      width: heightBase * 2,
      minWidth: heightBase * 2,
      borderRadius: '50%',
    },

    [`${skeletonButtonCls}-round`]: {
      borderRadius: heightBase,
    },

    [`${skeletonButtonCls}-lg`]: {
      ...genSkeletonElementButtonSize(heightLg),
    },
    [`${skeletonButtonCls}-sm`]: {
      ...genSkeletonElementButtonSize(heightSm),
    },
  };
};

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SkeletonToken> = (token: SkeletonToken, hashId: string) => {
  const {
    skeletonCls,
    skeletonAvatarCls,
    skeletonTitleCls,
    skeletonParagraphCls,
    skeletonButtonCls,
    skeletonInputCls,
    skeletonImageCls,
    avatarSizeBase,
    avatarSizeLg,
    avatarSizeSm,
    skeletonColor,
    padding,
    margin,
    skeletonTitleHeight,
    skeletonBlockRadius,
    skeletonParagraphLiHeight,
    skeletonParagraphLiMarginTop,
    skeletonParagraphMarginTop,
    marginSm,
  } = token;

  return {
    [`${skeletonCls}`]: {
      display: 'table',
      width: '100%',

      [`${skeletonCls}-header`]: {
        display: 'table-cell',
        paddingInlineEnd: padding,
        verticalAlign: 'top',

        // Avatar
        [`${skeletonAvatarCls}`]: {
          display: 'inline-block',
          verticalAlign: 'top',
          background: skeletonColor,
          ...genSkeletonElementAvatarSize(avatarSizeBase),

          [`${skeletonAvatarCls}-lg`]: {
            ...genSkeletonElementAvatarSize(avatarSizeLg),
          },
          [`${skeletonAvatarCls}-sm`]: {
            ...genSkeletonElementAvatarSize(avatarSizeSm),
          },
        },
      },
      [`${skeletonCls}-content`]: {
        display: 'table-cell',
        width: '100%',
        verticalAlign: 'top',

        // Title
        [`${skeletonTitleCls}`]: {
          width: '100%',
          height: skeletonTitleHeight,
          marginBlockStart: margin,
          background: skeletonColor,
          borderRadius: skeletonBlockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: skeletonParagraphLiMarginTop,
          },
        },

        // paragraph
        [`${skeletonParagraphCls}`]: {
          padding: 0,
          '> li': {
            width: '100%',
            height: skeletonParagraphLiHeight,
            listStyle: 'none',
            background: skeletonColor,
            borderRadius: skeletonBlockRadius,
            '+ li': {
              marginBlockStart: skeletonParagraphLiMarginTop,
            },
          },
        },

        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: '61%',
        },
      },

      [`${skeletonCls}-with-avatar &-content`]: {
        // Title
        [`${skeletonTitleCls}`]: {
          marginBlockStart: marginSm,

          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: skeletonParagraphMarginTop,
          },
        },
      },

      [`${skeletonCls}-round ${skeletonCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonTitleCls} > li`]: {
          borderRadius: '100px',
        },
      },
    },
    // Skeleton element
    [`${skeletonCls}${skeletonCls}-element`]: {
      display: 'inline-block',
      width: 'auto',

      ...genSkeletonElementButton(token),
      ...genSkeletonElementAvatar(token),

      [`${skeletonInputCls}`]: {
        ...genSkeletonElementInput(token),
      },

      [`${skeletonImageCls}`]: {
        ...genSkeletonElementImage(token),
      },
    },
    // Skeleton Block Button, Input
    [`${skeletonCls}${skeletonCls}-block`]: {
      width: '100%',

      [`${skeletonButtonCls}`]: {
        width: '100%',
      },

      [`${skeletonInputCls}`]: {
        width: '100%',
      },
    },
    // With active animation
    [`${skeletonCls}${skeletonCls}-active`]: {
      [`${skeletonCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          ...genSkeletonColor(token, hashId),
        },
      },
      [`${skeletonAvatarCls}`]: {
        ...genSkeletonColor(token, hashId),
      },

      [`${skeletonButtonCls}`]: {
        ...genSkeletonColor(token, hashId),
      },

      [`${skeletonInputCls}`]: {
        ...genSkeletonColor(token, hashId),
      },
      [`${skeletonImageCls}`]: {
        ...genSkeletonColor(token, hashId),
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const skeletonToken: SkeletonToken = {
    ...token,
    prefixCls,
    skeletonCls: `.${prefixCls}`,
    skeletonAvatarCls: `.${prefixCls}-avatar`,
    skeletonTitleCls: `.${prefixCls}-title`,
    skeletonParagraphCls: `.${prefixCls}-paragraph`,
    skeletonButtonCls: `.${prefixCls}-button`,
    skeletonInputCls: `.${prefixCls}-input`,
    skeletonImageCls: `.${prefixCls}-image`,

    avatarSizeBase: 32, // FIXME: hard code in v4
    avatarSizeLg: 40, // FIXME: hard code in v4
    avatarSizeSm: 24, // FIXME: hard code in v4

    heightBase: 32, // FIXME: hard code in v4
    heightLg: 40, // FIXME: hard code in v4
    heightSm: 24, // FIXME: hard code in v4

    marginLg: 24, // FIXME: hard code in v4
    marginSm: 12, // FIXME: hard code in v4

    skeletonColor: 'rgba(190,190,190,0.2)', // FIXME: hard code in v4
    skeletonToColor: 'rgba(129,129,129,.24)', // FIXME: hard code in v4
    imageSizeBase: 48, // FIXME: hard code in v4
    imageFontSizeBase: 24, // FIXME: hard code in v4
    skeletonTitleHeight: 16, // FIXME: hard code in v4
    skeletonBlockRadius: 4, // FIXME: hard code in v4
    skeletonParagraphLiMarginTop: 24, // FIXME: hard code in v4
    skeletonParagraphLiHeight: 16, // FIXME: hard code in v4
    skeletonParagraphMarginTop: 28, // FIXME: hard code in v4
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(skeletonToken, hashId),
    ]),
    hashId,
  ];
}
