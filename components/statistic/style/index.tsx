// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  useStyleRegister,
  useToken,
  resetComponent,
  GenerateStyle,
  UseComponentStyleResult,
} from '../../_util/theme';
import type { DerivativeToken } from '../../_util/theme';

interface StatisticToken extends DerivativeToken {
  statisticCls: string;
  statisticTitleFontSize: number;
  statisticContentFontSize: number;
  statisticFontFamily: string;
}

const genStatisticStyle: GenerateStyle<StatisticToken> = (token: StatisticToken): CSSObject => ({
  [`${token.statisticCls}`]: {
    ...resetComponent(token),
    [`${token.statisticCls}-title`]: {
      marginBottom: token.marginXXS,
      color: token.textColorSecondary,
      fontSize: token.statisticTitleFontSize,
    },
    [`${token.statisticCls}-content`]: {
      color: token.headingColor,
      fontSize: token.statisticContentFontSize,
      fontFamily: token.statisticFontFamily,
      [`${token.statisticCls}-content-value`]: {
        display: 'inline-block',
        direction: 'ltr',
      },
      [`${token.statisticCls}-content-prefix, ${token.statisticCls}-content-suffix`]: {
        display: 'inline-block',
      },
      [`${token.statisticCls}-content-prefix`]: {
        marginInlineStart: 4, // FIXME: hard code
      },
      [`${token.statisticCls}-content-suffix`]: {
        marginInlineEnd: 4, // FIXME: hard code
      },
    },
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const statisticToken: StatisticToken = {
    ...token,
    statisticCls: `.${prefixCls}`,
    statisticTitleFontSize: token.fontSize,
    statisticContentFontSize: 24, // FIXME: hard code
    statisticFontFamily: token.fontFamily,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genStatisticStyle(statisticToken),
    ]),
    hashId,
  ];
}
