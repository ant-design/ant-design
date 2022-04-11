// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { GenerateStyle, genComponentStyleHook, FullToken, mergeToken } from '../../_util/theme';

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
  const { componentCls, iconCls } = token;

  return {
    // Result
    [componentCls]: {
      padding: `${token.padding * 3}px ${token.padding * 2}px`,

      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },

    // Exception Status image
    [`${componentCls} ${componentCls}-image`]: {
      // FIXME: hard code
      width: 250,
      height: 295,
      margin: 'auto',
    },

    [`${componentCls} ${componentCls}-icon`]: {
      marginBottom: token.padding * 1.5,
      textAlign: 'center',

      [`& > ${iconCls}`]: {
        fontSize: token.resultIconFontSize,
      },
    },

    [`${componentCls} ${componentCls}-title`]: {
      color: token.colorTextHeading,
      fontSize: token.resultTitleFontSize,
      // FIXME: hard code
      lineHeight: 1.8,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-subtitle`]: {
      color: token.colorTextSecondary,
      fontSize: token.resultSubtitleFontSize,
      // FIXME: hard code
      lineHeight: 1.6,
      textAlign: 'center',
    },

    [`${componentCls} ${componentCls}-content`]: {
      marginTop: token.padding * 1.5,
      padding: `${token.padding * 1.5}px ${token.padding * 2.5}px`,
      backgroundColor: token.colorBgComponentSecondary,
    },

    [`${componentCls} ${componentCls}-extra`]: {
      margin: token.resultExtraMargin,
      textAlign: 'center',

      '& > *': {
        marginInlineEnd: token.paddingXS,

        '&:last-child': {
          marginInlineEnd: 0,
        },
      },
    },
  };
};

const genStatusIconStyle: GenerateStyle<ResultToken> = token => {
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

const genResultStyle: GenerateStyle<ResultToken> = token => [
  genBaseStyle(token),
  genStatusIconStyle(token),
];

// ============================== Export ==============================
const getStyle: GenerateStyle<ResultToken> = token => genResultStyle(token);

export default genComponentStyleHook('Result', token => {
  // compact 20
  // FIXME: maybe we need a new token for fontSize 12px
  const resultTitleFontSize = 24;
  const resultSubtitleFontSize = token.fontSize;
  // compact 64
  // FIXME: maybe we need a new token for fontSize 12px
  const resultIconFontSize = 72;
  const resultExtraMargin = `${token.padding * 1.5}px 0 0 0`;

  const resultInfoIconColor = token.colorInfo;
  const resultErrorIconColor = token.colorError;
  const resultSuccessIconColor = token.colorSuccess;
  const resultWarningIconColor = token.colorWarning;

  const resultToken = mergeToken<ResultToken>(token, {
    resultTitleFontSize,
    resultSubtitleFontSize,
    resultIconFontSize,
    resultExtraMargin,
    resultInfoIconColor,
    resultErrorIconColor,
    resultSuccessIconColor,
    resultWarningIconColor,
  });

  return [getStyle(resultToken)];
});
