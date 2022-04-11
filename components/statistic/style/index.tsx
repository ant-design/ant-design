// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  resetComponent,
  GenerateStyle,
  FullToken,
  genComponentStyleHook,
  mergeToken,
} from '../../_util/theme';

interface StatisticToken extends FullToken<'Statistic'> {
  statisticTitleFontSize: number;
  statisticContentFontSize: number;
  statisticFontFamily: string;
}

const genStatisticStyle: GenerateStyle<StatisticToken> = (token: StatisticToken): CSSObject => ({
  [`${token.componentCls}`]: {
    ...resetComponent(token),
    [`${token.componentCls}-title`]: {
      marginBottom: token.marginXXS,
      color: token.colorTextSecondary,
      fontSize: token.statisticTitleFontSize,
    },
    [`${token.componentCls}-content`]: {
      color: token.colorTextHeading,
      fontSize: token.statisticContentFontSize,
      fontFamily: token.statisticFontFamily,
      [`${token.componentCls}-content-value`]: {
        display: 'inline-block',
        direction: 'ltr',
      },
      [`${token.componentCls}-content-prefix, ${token.componentCls}-content-suffix`]: {
        display: 'inline-block',
      },
      [`${token.componentCls}-content-prefix`]: {
        marginInlineStart: 4, // FIXME: hard code
      },
      [`${token.componentCls}-content-suffix`]: {
        marginInlineEnd: 4, // FIXME: hard code
      },
    },
  },
});

// ============================== Export ==============================
export default genComponentStyleHook('Statistic', token => {
  const statisticToken = mergeToken<StatisticToken>(token, {
    statisticTitleFontSize: token.fontSize,
    statisticContentFontSize: 24, // FIXME: hard code
    statisticFontFamily: token.fontFamily,
  });
  return [genStatisticStyle(statisticToken)];
});
