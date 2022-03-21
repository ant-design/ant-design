// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
} from '../../_util/theme';

interface ResultToken extends DerivativeToken {
  resultCls: string;
  dotIconPrefixCls: string;

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
  const { resultCls, dotIconPrefixCls } = token;

  return {
    // Result
    [resultCls]: {
      padding: `${token.padding * 3}px ${token.padding * 2}px`,

      // RTL
      '&-rtl': {
        direction: 'rtl',
      },
    },

    // Exception Status image
    [`${resultCls} ${resultCls}-image`]: {
      // FIXME: hard code
      width: 250,
      height: 295,
      margin: 'auto',
    },

    [`${resultCls} ${resultCls}-icon`]: {
      marginBottom: token.padding * 1.5,
      textAlign: 'center',

      [`& > ${dotIconPrefixCls}`]: {
        fontSize: token.resultIconFontSize,
      },
    },

    [`${resultCls} ${resultCls}-title`]: {
      color: token.headingColor,
      fontSize: token.resultTitleFontSize,
      // FIXME: hard code
      lineHeight: 1.8,
      textAlign: 'center',
    },

    [`${resultCls} ${resultCls}-subtitle`]: {
      color: token.textColorSecondary,
      fontSize: token.resultSubtitleFontSize,
      // FIXME: hard code
      lineHeight: 1.6,
      textAlign: 'center',
    },

    [`${resultCls} ${resultCls}-content`]: {
      marginTop: token.padding * 1.5,
      padding: `${token.padding * 1.5}px ${token.padding * 2.5}px`,
      backgroundColor: token.backgroundLight,
    },

    [`${resultCls} ${resultCls}-extra`]: {
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
  const { resultCls, dotIconPrefixCls } = token;

  return {
    [`${resultCls}-success ${resultCls}-icon > ${dotIconPrefixCls}`]: {
      color: token.resultSuccessIconColor,
    },
    [`${resultCls}-error ${resultCls}-icon > ${dotIconPrefixCls}`]: {
      color: token.resultErrorIconColor,
    },
    [`${resultCls}-info ${resultCls}-icon > ${dotIconPrefixCls}`]: {
      color: token.resultInfoIconColor,
    },
    [`${resultCls}-warning ${resultCls}-icon > ${dotIconPrefixCls}`]: {
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

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

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

  const resultToken: ResultToken = {
    ...token,
    resultCls: `.${prefixCls}`,
    dotIconPrefixCls: `.${iconPrefixCls}`,
    resultTitleFontSize,
    resultSubtitleFontSize,
    resultIconFontSize,
    resultExtraMargin,
    resultInfoIconColor,
    resultErrorIconColor,
    resultSuccessIconColor,
    resultWarningIconColor,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => getStyle(resultToken)),
    hashId,
  ];
}
