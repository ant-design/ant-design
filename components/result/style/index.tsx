import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  imageWidth: number;
  imageHeight: number;
}

interface ResultToken extends FullToken<'Result'> {
  resultTitleFontSize: number;
  resultSubtitleFontSize: number;
  resultIconFontSize: number;

  resultExtraMargin: string;

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
        fontSize: token.resultIconFontSize,
      },
    },

    [`${componentCls} ${componentCls}-title`]: {
      color: token.colorTextHeading,
      fontSize: token.resultTitleFontSize,
      lineHeight: lineHeightHeading3,
      marginBlock: marginXS,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-subtitle`]: {
      color: token.colorTextDescription,
      fontSize: token.resultSubtitleFontSize,
      lineHeight,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-content`]: {
      marginTop: paddingLG,
      padding: `${paddingLG}px ${padding * 2.5}px`,
      backgroundColor: token.colorFillAlter,
    },

    [`${componentCls} ${componentCls}-extra`]: {
      margin: token.resultExtraMargin,
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
    const { paddingLG, fontSizeHeading3 } = token;

    const resultSubtitleFontSize = token.fontSize;
    const resultExtraMargin = `${paddingLG}px 0 0 0`;

    const resultInfoIconColor = token.colorInfo;
    const resultErrorIconColor = token.colorError;
    const resultSuccessIconColor = token.colorSuccess;
    const resultWarningIconColor = token.colorWarning;

    const resultToken = mergeToken<ResultToken>(token, {
      resultTitleFontSize: fontSizeHeading3,
      resultSubtitleFontSize,
      resultIconFontSize: fontSizeHeading3 * 3,
      resultExtraMargin,
      resultInfoIconColor,
      resultErrorIconColor,
      resultSuccessIconColor,
      resultWarningIconColor,
    });

    return [getStyle(resultToken)];
  },
  {
    imageWidth: 250,
    imageHeight: 295,
  },
);
