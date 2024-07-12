import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes, unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import type { CSSUtil } from '../../theme/util/genComponentStyleHook';

export type ComponentToken = {
  /** @deprecated use gradientFromColor instead. */
  color: string;
  /** @deprecated use gradientToColor instead. */
  colorGradientEnd: string;
  /**
   * @desc 渐变色起点颜色
   * @descEN Start color of gradient
   */
  gradientFromColor: string;
  /**
   * @desc 渐变色终点颜色
   * @descEN End color of gradient
   */
  gradientToColor: string;
  /**
   * @desc 标题骨架屏高度
   * @descEN Height of title skeleton
   */
  titleHeight: number;
  /**
   * @desc 骨架屏圆角
   * @descEN Border radius of skeleton
   */
  blockRadius: number;
  /**
   * @desc 段落骨架屏上间距
   * @descEN Margin top of paragraph skeleton
   */
  paragraphMarginTop: number;
  /**
   * @desc 段落骨架屏单行高度
   * @descEN Line height of paragraph skeleton
   */
  paragraphLiHeight: number;
};

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
  imageSizeBase: number | string;
  skeletonLoadingBackground: string;
  skeletonLoadingMotionDuration: string;
  borderRadius: number;
}

const genSkeletonElementCommonSize = (size: number | string): CSSObject => ({
  height: size,
  lineHeight: unit(size),
});

const genSkeletonElementAvatarSize = (size: number | string): CSSObject => ({
  width: size,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonColor = (token: SkeletonToken): CSSObject => ({
  background: token.skeletonLoadingBackground,
  backgroundSize: '400% 100%',
  animationName: skeletonClsLoading,
  animationDuration: token.skeletonLoadingMotionDuration,
  animationTimingFunction: 'ease',
  animationIterationCount: 'infinite',
});
const genSkeletonElementInputSize = (size: number, calc: CSSUtil['calc']): CSSObject => ({
  width: calc(size).mul(5).equal(),
  minWidth: calc(size).mul(5).equal(),
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementAvatar = (token: SkeletonToken): CSSObject => {
  const { skeletonAvatarCls, gradientFromColor, controlHeight, controlHeightLG, controlHeightSM } =
    token;
  return {
    [`${skeletonAvatarCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: gradientFromColor,
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
  const {
    controlHeight,
    borderRadiusSM,
    skeletonInputCls,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc,
  } = token;
  return {
    [`${skeletonInputCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      ...genSkeletonElementInputSize(controlHeight, calc),
    },

    [`${skeletonInputCls}-lg`]: {
      ...genSkeletonElementInputSize(controlHeightLG, calc),
    },

    [`${skeletonInputCls}-sm`]: {
      ...genSkeletonElementInputSize(controlHeightSM, calc),
    },
  };
};

const genSkeletonElementImageSize = (size: number | string): CSSObject => ({
  width: size,
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementImage = (token: SkeletonToken): CSSObject => {
  const { skeletonImageCls, imageSizeBase, gradientFromColor, borderRadiusSM, calc } = token;
  return {
    [`${skeletonImageCls}`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'top',
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      ...genSkeletonElementImageSize(calc(imageSizeBase).mul(2).equal()),
      [`${skeletonImageCls}-path`]: {
        fill: '#bfbfbf',
      },
      [`${skeletonImageCls}-svg`]: {
        ...genSkeletonElementImageSize(imageSizeBase),
        maxWidth: calc(imageSizeBase).mul(4).equal(),
        maxHeight: calc(imageSizeBase).mul(4).equal(),
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

const genSkeletonElementButtonSize = (size: number, calc: CSSUtil['calc']): CSSObject => ({
  width: calc(size).mul(2).equal(),
  minWidth: calc(size).mul(2).equal(),
  ...genSkeletonElementCommonSize(size),
});

const genSkeletonElementButton = (token: SkeletonToken): CSSObject => {
  const {
    borderRadiusSM,
    skeletonButtonCls,
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    gradientFromColor,
    calc,
  } = token;
  return {
    [`${skeletonButtonCls}`]: {
      display: 'inline-block',
      verticalAlign: 'top',
      background: gradientFromColor,
      borderRadius: borderRadiusSM,
      width: calc(controlHeight).mul(2).equal(),
      minWidth: calc(controlHeight).mul(2).equal(),
      ...genSkeletonElementButtonSize(controlHeight, calc),
    },
    ...genSkeletonElementButtonShape(token, controlHeight, skeletonButtonCls),

    [`${skeletonButtonCls}-lg`]: {
      ...genSkeletonElementButtonSize(controlHeightLG, calc),
    },
    ...genSkeletonElementButtonShape(token, controlHeightLG, `${skeletonButtonCls}-lg`),

    [`${skeletonButtonCls}-sm`]: {
      ...genSkeletonElementButtonSize(controlHeightSM, calc),
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
    gradientFromColor,
    padding,
    marginSM,
    borderRadius,
    titleHeight,
    blockRadius,
    paragraphLiHeight,
    controlHeightXS,
    paragraphMarginTop,
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
          background: gradientFromColor,
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
          height: titleHeight,
          background: gradientFromColor,
          borderRadius: blockRadius,
          [`+ ${skeletonParagraphCls}`]: {
            marginBlockStart: controlHeightSM,
          },
        },

        // paragraph
        [`${skeletonParagraphCls}`]: {
          padding: 0,
          '> li': {
            width: '100%',
            height: paragraphLiHeight,
            listStyle: 'none',
            background: gradientFromColor,
            borderRadius: blockRadius,
            '+ li': {
              marginBlockStart: controlHeightXS,
            },
          },
        },

        [`${skeletonParagraphCls}> li:last-child:not(:first-child):not(:nth-child(2))`]: {
          width: '61%',
        },
      },

      [`&-round ${componentCls}-content`]: {
        [`${skeletonTitleCls}, ${skeletonParagraphCls} > li`]: {
          borderRadius,
        },
      },
    },
    [`${componentCls}-with-avatar ${componentCls}-content`]: {
      // Title
      [`${skeletonTitleCls}`]: {
        marginBlockStart: marginSM,

        [`+ ${skeletonParagraphCls}`]: {
          marginBlockStart: paragraphMarginTop,
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
      [`
        ${skeletonTitleCls},
        ${skeletonParagraphCls} > li,
        ${skeletonAvatarCls},
        ${skeletonButtonCls},
        ${skeletonInputCls},
        ${skeletonImageCls}
      `]: {
        ...genSkeletonColor(token),
      },
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Skeleton'> = (token) => {
  const { colorFillContent, colorFill } = token;
  const gradientFromColor = colorFillContent;
  const gradientToColor = colorFill;
  return {
    color: gradientFromColor,
    colorGradientEnd: gradientToColor,
    gradientFromColor,
    gradientToColor,
    titleHeight: token.controlHeight / 2,
    blockRadius: token.borderRadiusSM,
    paragraphMarginTop: token.marginLG + token.marginXXS,
    paragraphLiHeight: token.controlHeight / 2,
  };
};

export default genStyleHooks(
  'Skeleton',
  (token) => {
    const { componentCls, calc } = token;

    const skeletonToken = mergeToken<SkeletonToken>(token, {
      skeletonAvatarCls: `${componentCls}-avatar`,
      skeletonTitleCls: `${componentCls}-title`,
      skeletonParagraphCls: `${componentCls}-paragraph`,
      skeletonButtonCls: `${componentCls}-button`,
      skeletonInputCls: `${componentCls}-input`,
      skeletonImageCls: `${componentCls}-image`,
      imageSizeBase: calc(token.controlHeight).mul(1.5).equal(),
      borderRadius: 100, // Large number to make capsule shape
      skeletonLoadingBackground: `linear-gradient(90deg, ${token.gradientFromColor} 25%, ${token.gradientToColor} 37%, ${token.gradientFromColor} 63%)`,
      skeletonLoadingMotionDuration: '1.4s',
    });
    return [genBaseStyle(skeletonToken)];
  },
  prepareComponentToken,
  {
    deprecatedTokens: [
      ['color', 'gradientFromColor'],
      ['colorGradientEnd', 'gradientToColor'],
    ],
  },
);
