import type { CSSProperties } from 'react';
import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 标题字体大小
   * @descEN Title font size
   */
  titleFontSize: number;
  /**
   * @desc 副标题字体大小
   * @descEN Subtitle font size
   */
  subtitleFontSize: number;
  /**
   * @desc 图标大小
   * @descEN Icon size
   */
  iconFontSize: number;
  /**
   * @desc 额外区域外间距
   * @descEN Margin of extra area
   */
  extraMargin: CSSProperties['margin'];
}

interface ResultToken extends FullToken<'Result'> {
  imageWidth: number | string;
  imageHeight: number | string;
  resultInfoIconColor: string;
  resultSuccessIconColor: string;
  resultWarningIconColor: string;
  resultErrorIconColor: string;
}

// ============================== Styles ==============================
const genBaseStyle: GenerateStyle<ResultToken> = (token): CSSObject => {
  const {
    componentCls,
    lineHeightHeading3,
    iconCls,
    padding,
    paddingXL,
    paddingXS,
    paddingLG,
    marginXS,
    lineHeight,
  } = token;

  return {
    // Result
    [componentCls]: {
      padding: `${unit(token.calc(paddingLG).mul(2).equal())} ${unit(paddingXL)}`,

      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },

    // Exception Status image
    [`${componentCls} ${componentCls}-image`]: {
      width: token.imageWidth,
      height: token.imageHeight,
      margin: 'auto',
    },

    [`${componentCls} ${componentCls}-icon`]: {
      marginBottom: paddingLG,
      textAlign: 'center',

      [`& > ${iconCls}`]: {
        fontSize: token.iconFontSize,
      },
    },

    [`${componentCls} ${componentCls}-title`]: {
      color: token.colorTextHeading,
      fontSize: token.titleFontSize,
      lineHeight: lineHeightHeading3,
      marginBlock: marginXS,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-subtitle`]: {
      color: token.colorTextDescription,
      fontSize: token.subtitleFontSize,
      lineHeight,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-content`]: {
      marginTop: paddingLG,
      padding: `${unit(paddingLG)} ${unit(token.calc(padding).mul(2.5).equal())}`,
      backgroundColor: token.colorFillAlter,
    },

    [`${componentCls} ${componentCls}-extra`]: {
      margin: token.extraMargin,
      textAlign: 'center',

      '& > *': {
        marginInlineEnd: paddingXS,

        '&:last-child': {
          marginInlineEnd: 0,
        },
      },
    },
  };
};

const genStatusIconStyle: GenerateStyle<ResultToken> = (token) => {
  const { componentCls, iconCls } = token;

  return {
    // 原有的状态图标样式
    [`${componentCls}-success ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultSuccessIconColor,
    },
    [`${componentCls}-error ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultErrorIconColor,
    },
    [`${componentCls}-info ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultInfoIconColor,
    },
    [`${componentCls}-warning ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultWarningIconColor,
    },

    // 新增的语义化图标类名样式
    [`${componentCls}-icon-success > ${iconCls}`]: {
      color: token.resultSuccessIconColor,
    },
    [`${componentCls}-icon-error > ${iconCls}`]: {
      color: token.resultErrorIconColor,
    },
    [`${componentCls}-icon-info > ${iconCls}`]: {
      color: token.resultInfoIconColor,
    },
    [`${componentCls}-icon-warning > ${iconCls}`]: {
      color: token.resultWarningIconColor,
    },
  };
};

const genSemanticStyle: GenerateStyle<ResultToken> = (token) => {
  const { componentCls } = token;

  return {
    // 状态相关的标题样式
    [`${componentCls}-title-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-title-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-title-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-title-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },

    // 状态相关的副标题样式
    [`${componentCls}-subtitle-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-subtitle-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-subtitle-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-subtitle-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },

    // 状态相关的内容区域样式
    [`${componentCls}-content-success`]: {
      // 可以根据需要添加成功状态的特殊样式
    },
    [`${componentCls}-content-error`]: {
      // 可以根据需要添加错误状态的特殊样式
    },
    [`${componentCls}-content-warning`]: {
      // 可以根据需要添加警告状态的特殊样式
    },
    [`${componentCls}-content-info`]: {
      // 可以根据需要添加信息状态的特殊样式
    },
  };
};

const genResultStyle: GenerateStyle<ResultToken> = (token) => [
  genBaseStyle(token),
  genStatusIconStyle(token),
  genSemanticStyle(token),
];

const getStyle: GenerateStyle<ResultToken> = (token) => genResultStyle(token);

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Result'> = (token) => ({
  titleFontSize: token.fontSizeHeading3,
  subtitleFontSize: token.fontSize,
  iconFontSize: token.fontSizeHeading3 * 3,
  extraMargin: `${token.paddingLG}px 0 0 0`,
});

export default genStyleHooks(
  'Result',
  (token) => {
    const resultInfoIconColor = token.colorInfo;
    const resultErrorIconColor = token.colorError;
    const resultSuccessIconColor = token.colorSuccess;
    const resultWarningIconColor = token.colorWarning;

    const resultToken = mergeToken<ResultToken>(token, {
      resultInfoIconColor,
      resultErrorIconColor,
      resultSuccessIconColor,
      resultWarningIconColor,
      imageWidth: 250,
      imageHeight: 295,
    });

    return [getStyle(resultToken)];
  },
  prepareComponentToken,
);
