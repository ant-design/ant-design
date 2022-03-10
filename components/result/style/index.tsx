// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
} from '../../_util/theme';

interface ResultToken extends DerivativeToken {
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
const genBaseStyle = (
  resultCls: string,
  dotIconPrefixCls: string,
  token: ResultToken,
): CSSObject => ({
  // Result
  [resultCls]: {
    padding: `${token.padding * 3}px ${token.padding * 2}px`,
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
});

const genStatusIconStyle = (
  resultCls: string,
  iconPrefixCls: string,
  token: ResultToken,
): CSSObject => ({
  [`${resultCls}-success ${resultCls}-icon > ${iconPrefixCls}`]: {
    color: token.resultSuccessIconColor,
  },
  [`${resultCls}-error ${resultCls}-icon > ${iconPrefixCls}`]: {
    color: token.resultErrorIconColor,
  },
  [`${resultCls}-info ${resultCls}-icon > ${iconPrefixCls}`]: {
    color: token.resultInfoIconColor,
  },
  [`${resultCls}-warning ${resultCls}-icon > ${iconPrefixCls}`]: {
    color: token.resultWarningIconColor,
  },
});

export const genResultStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const resultCls = `.${prefixCls}`;
  const dotIconPrefixCls = `.${iconPrefixCls}`;

  // compact 20
  // FIXME: maybe we need a new token for fontSize 12px
  const resultTitleFontSize = 24;
  const resultSubtitleFontSize = token.fontSize;
  // compact 64
  // FIXME: maybe we need a new token for fontSize 12px
  const resultIconFontSize = 72;
  const resultExtraMargin = `${token.padding * 1.5}px 0 0 0`;

  const resultInfoIconColor = token.infoColor;
  const resultErrorIconColor = token.errorColor;
  const resultSuccessIconColor = token.successColor;
  const resultWarningIconColor = token.warningColor;

  const resultToken = {
    ...token,
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
    genBaseStyle(resultCls, dotIconPrefixCls, resultToken),
    genStatusIconStyle(resultCls, dotIconPrefixCls, resultToken),
  ];
};

// ============================== Export ==============================
export function getStyle(prefixCls: string, iconPrefixCls: string, token: DerivativeToken) {
  return [genResultStyle(prefixCls, iconPrefixCls, token)];
}

export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
      getStyle(prefixCls, iconPrefixCls, token),
    ),
    hashId,
  ];
}
