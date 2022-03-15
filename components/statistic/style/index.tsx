// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister, useToken, resetComponent } from '../../_util/theme';
import type { DerivativeToken } from '../../_util/theme';

interface StatisticToken extends DerivativeToken {
  statisticCls: string;
  statisticTitleFontSize: number;
  statisticContentFontSize: number;
  statisticFontFamily: string;
}

const genStatisticStyle = (token: StatisticToken, commonToken: DerivativeToken): CSSObject => ({
  [`${token.statisticCls}`]: {
    ...resetComponent(token),
    [`${token.statisticCls}-title`]: {
      marginBottom: commonToken.marginXXS,
      color: commonToken.textColorSecondary,
      fontSize: token.statisticTitleFontSize,
    },
    [`${token.statisticCls}-content`]: {
      color: commonToken.headingColor,
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
        marginRight: 4,
      },
      [`${token.statisticCls}-content-suffix`]: {
        marginLeft: 4,
      },
    },
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  const statisticToken: StatisticToken = {
    ...token,
    statisticCls: `.${prefixCls}`,
    statisticTitleFontSize: token.fontSize,
    statisticContentFontSize: 24,
    statisticFontFamily: token.fontFamily,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genStatisticStyle(statisticToken, token),
    ]),
    hashId,
  ];
}
