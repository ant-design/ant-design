import type { CSSObject } from '@ant-design/cssinjs';
import type { CSSProperties } from 'react';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

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
  imageWidth: number;
  imageHeight: number;
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
      padding: `${paddingLG * 2}px ${paddingXL}px`,

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
      padding: `${paddingLG}px ${padding * 2.5}px`,
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
  };
};

const genResultStyle: GenerateStyle<ResultToken> = (token) => [
  genBaseStyle(token),
  genStatusIconStyle(token),
];

// ============================== Export ==============================
const getStyle: GenerateStyle<ResultToken> = (token) => genResultStyle(token);

export default genComponentStyleHook(
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
  (token) => ({
    titleFontSize: token.fontSizeHeading3,
    subtitleFontSize: token.fontSize,
    iconFontSize: token.fontSizeHeading3 * 3,
    extraMargin: `${token.paddingLG}px 0 0 0`,
  }),
);
