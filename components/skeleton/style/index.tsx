// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';

import { GenerateStyle, FullToken, genComponentStyleHook, mergeToken } from '../../_util/theme';

const skeletonClsLoading = new Keyframes(`ant-skeleton-loading`, {
  '0%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0 50%',
  },
});

interface SkeletonToken extends FullToken<'Skeleton'> {
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

const genSkeletonColor = (token: SkeletonToken): CSSObject => {
  const { skeletonColor, skeletonToColor } = token;
  return {
    background: `linear-gradient(90deg, ${skeletonColor} 25%, ${skeletonToColor} 37%, ${skeletonColor} 63%)`,
    backgroundSize: '400% 100%',
    animationName: skeletonClsLoading,
    animationDuration: '1.4s', // FIXME: magic
    animationTimingFunction: 'ease',
    animationIterationCount: 'infinite',
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
  const { controlHeight, skeletonInputCls, controlHeightLG, controlHeightSM, skeletonColor } =
    token;
  return {
    [`${skeletonInputCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: skeletonColor,
      ...genSkeletonElementInputSize(controlHeight),
    },

    [`${skeletonInputCls}-lg`]: {
      ...genSkeletonElementInputSize(controlHeightLG),
    },

    [`${skeletonInputCls}-sm`]: {
      ...genSkeletonElementInputSize(controlHeightSM),
    },
  };
};

const genSkeletonElementImageSize = (size: number): CSSObject => ({
  width: size,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementImage = (token: SkeletonToken): CSSObject => {
  const { skeletonImageCls, imageSizeBase, skeletonColor } = token;
  return {
    [`${skeletonImageCls}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      background: skeletonColor,
      ...genSkeletonElementImageSize(imageSizeBase * 2),
      [`${skeletonImageCls}-path`]: {
        fill: '#bfbfbf',
      },
      [`${skeletonImageCls}-svg`]: {
        ...genSkeletonElementImageSize(imageSizeBase),
        maxWidth: imageSizeBase * 4,
        maxHeight: imageSizeBase * 4,
      },
      [`${skeletonImageCls}-svg${skeletonImageCls}-svg-circle`]: {
        borderRadius: '50%',
      },
    },
    [`${skeletonImageCls}${skeletonImageCls}-circle`]: {
      borderRadius: '50%',
    },
  };
};
const genSkeletonElementButtonShape = (
  token: SkeletonToken,
  size: number,
  buttonCls: string,
): CSSObject => {
  const { skeletonButtonCls } = token;
  return {
    [`${buttonCls}${skeletonButtonCls}-circle`]: {
      width: size,
      minWidth: size,
      borderRadius: '50%',
    },
    [`${buttonCls}${skeletonButtonCls}-round`]: {
      borderRadius: size,
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
      width: controlHeight * 2,
      minWidth: controlHeight * 2,
      ...genSkeletonElementButtonSize(controlHeight),
    },
    ...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),

    [`${skeletonButtonCls}-lg`]: {
      ...genSkeletonElementButtonSize(controlHeightLG),
    },
    ...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),

    [`${skeletonButtonCls}-sm`]: {
      ...genSkeletonElementButtonSize(controlHeightSM),
    },
    ...genSkeletonElementButtonShape(token, controlHeightSM, `${skeletonButtonCls}-sm`),
  };
};

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SkeletonToken> = (token: SkeletonToken) => {
  const {
    componentCls,
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
    controlHeightXS,
    skeletonParagraphMarginTop,
  } = token;

  return {
    [`${componentCls}`]: {
      display: 'table',
      width: '100%',

      [`${componentCls}-header`]: {
        display: 'table-cell',
        paddingInlineEnd: padding,
        verticalAlign: 'top',

        // Avatar
        [`${skeletonAvatarCls}`]: {
          display: 'inline-block',
          verticalAlign: 'top',
          background: skeletonColor,
          ...genSkeletonElementAvatarSize(controlHeight),
        },
        [`${skeletonAvatarCls}-circle`]: {
          borderRadius: '50%',
        },
        [`${skeletonAvatarCls}-lg`]: {
          ...genSkeletonElementAvatarSize(controlHeightLG),
        },
        [`${skeletonAvatarCls}-sm`]: {
          ...genSkeletonElementAvatarSize(controlHeightSM),
        },
      },
      [`${componentCls}-content`]: {
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
            marginBlockStart: controlHeightSM,
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
              marginBlockStart: controlHeightXS,
            },
          },
        },

        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: '61%',
        },
      },

      [`${componentCls}-round ${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonTitleCls} > li`]: {
          borderRadius,
        },
      },
    },
    [`${componentCls}-with-avatar ${componentCls}-content`]: {
      // Title
      [`${skeletonTitleCls}`]: {
        marginBlockStart: marginSM,

        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: skeletonParagraphMarginTop,
        },
      },
    },
    // Skeleton element
    [`${componentCls}${componentCls}-element`]: {
      display: 'inline-block',
      width: 'auto',

      ...genSkeletonElementButton(token),
      ...genSkeletonElementAvatar(token),
      ...genSkeletonElementInput(token),
      ...genSkeletonElementImage(token),
    },
    // Skeleton Block Button, Input
    [`${componentCls}${componentCls}-block`]: {
      width: '100%',

      [`${skeletonButtonCls}`]: {
        width: '100%',
      },

      [`${skeletonInputCls}`]: {
        width: '100%',
      },
    },
    // With active animation
    [`${componentCls}${componentCls}-active`]: {
      [`${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          ...genSkeletonColor(token),
        },
      },
      [`${skeletonAvatarCls}`]: {
        ...genSkeletonColor(token),
      },

      [`${skeletonButtonCls}`]: {
        ...genSkeletonColor(token),
      },

      [`${skeletonInputCls}`]: {
        ...genSkeletonColor(token),
      },
      [`${skeletonImageCls}`]: {
        ...genSkeletonColor(token),
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Skeleton', token => {
  const { componentCls } = token;

  const skeletonToken = mergeToken<SkeletonToken>(token, {
    skeletonAvatarCls: `${componentCls}-avatar`,
    skeletonTitleCls: `${componentCls}-title`,
    skeletonParagraphCls: `${componentCls}-paragraph`,
    skeletonButtonCls: `${componentCls}-button`,
    skeletonInputCls: `${componentCls}-input`,
    skeletonImageCls: `${componentCls}-image`,
    skeletonColor: 'rgba(190,190,190,0.2)', // FIXME: hard code in v4
    skeletonToColor: 'rgba(129,129,129,.24)', // FIXME: hard code in v4
    imageSizeBase: 48, // FIXME: hard code in v4
    imageFontSizeBase: 24, // FIXME: hard code in v4
    skeletonTitleHeight: 16, // FIXME: hard code in v4
    skeletonBlockRadius: 4, // FIXME: hard code in v4
    skeletonParagraphLiHeight: 16, // FIXME: hard code in v4
    skeletonParagraphMarginTop: 28, // FIXME: hard code in v4
    borderRadius: 100, // FIXME: hard code in v4
  });
  return [genBaseStyle(skeletonToken), skeletonClsLoading];
});
