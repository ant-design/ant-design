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
  imageSizeBase: number;
  imageFontSizeBase: number;
  skeletonTitleHeight: number;
  skeletonBlockRadius: number;
  skeletonParagraphLiHeight: number;
  skeletonParagraphLiMarginTop: number;
  skeletonParagraphMarginTop: number;
  borderRadius: number;
}

const genSkeletonElementCommonSize = (size: number): CSSObject => ({
  height: size,
  lineHeight: `${size}px`,
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
  const { skeletonAvatarCls, skeletonColor, controlHeight, controlHeightLG, controlHeightSM } =
    token;
  return {
    [`${skeletonAvatarCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: skeletonColor,
      ...genSkeletonElementAvatarSize(controlHeight),
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-circle`]: {
      borderRadius: '50%',
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-lg`]: {
      ...genSkeletonElementAvatarSize(controlHeightLG),
    },
    [`${skeletonAvatarCls}${skeletonAvatarCls}-sm`]: {
      ...genSkeletonElementAvatarSize(controlHeightSM),
    },
  };
};

const genSkeletonElementInput = (token: SkeletonToken): CSSObject => {
  const { controlHeight, skeletonCls, controlHeightLG, controlHeightSM, skeletonColor } = token;
  return {
    display: 'inline-block',
    verticalAlign: 'top',
    background: skeletonColor,
    ...genSkeletonElementInputSize(controlHeight),

    [`${skeletonCls}-lg`]: {
      ...genSkeletonElementInputSize(controlHeightLG),
    },

    [`${skeletonCls}-sm`]: {
      ...genSkeletonElementInputSize(controlHeightSM),
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
  const {
    radiusBase,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    skeletonColor,
  } = token;
  return {
    [`${skeletonButtonCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: skeletonColor,
      borderRadius: radiusBase,
      ...genSkeletonElementButtonSize(controlHeight),
    },

    [`${skeletonButtonCls}-circle`]: {
      width: controlHeight * 2,
      minWidth: controlHeight * 2,
      borderRadius: '50%',
    },

    [`${skeletonButtonCls}-round`]: {
      borderRadius: controlHeight,
    },

    [`${skeletonButtonCls}-lg`]: {
      ...genSkeletonElementButtonSize(controlHeightLG),
    },
    [`${skeletonButtonCls}-sm`]: {
      ...genSkeletonElementButtonSize(controlHeightSM),
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
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    skeletonColor,
    padding,
    margin,
    marginSM,
    borderRadius,
    skeletonTitleHeight,
    skeletonBlockRadius,
    skeletonParagraphLiHeight,
    skeletonParagraphLiMarginTop,
    skeletonParagraphMarginTop,
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
          ...genSkeletonElementAvatarSize(controlHeight),

          [`${skeletonAvatarCls}-lg`]: {
            ...genSkeletonElementAvatarSize(controlHeightLG),
          },
          [`${skeletonAvatarCls}-sm`]: {
            ...genSkeletonElementAvatarSize(controlHeightSM),
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
          marginBlockStart: marginSM,

          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: skeletonParagraphMarginTop,
          },
        },
      },

      [`${skeletonCls}-round ${skeletonCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonTitleCls} > li`]: {
          borderRadius,
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
    skeletonColor: 'rgba(190,190,190,0.2)', // FIXME: hard code in v4
    skeletonToColor: 'rgba(129,129,129,.24)', // FIXME: hard code in v4
    imageSizeBase: 48, // FIXME: hard code in v4
    imageFontSizeBase: 24, // FIXME: hard code in v4
    skeletonTitleHeight: 16, // FIXME: hard code in v4
    skeletonBlockRadius: 4, // FIXME: hard code in v4
    skeletonParagraphLiMarginTop: 24, // FIXME: hard code in v4
    skeletonParagraphLiHeight: 16, // FIXME: hard code in v4
    skeletonParagraphMarginTop: 28, // FIXME: hard code in v4
    borderRadius: 100, // FIXME: hard code in v4
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(skeletonToken, hashId),
    ]),
    hashId,
  ];
}
