// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';

interface StatisticToken extends FullToken<'Statistic'> {
  statisticTitleFontSize: number;
  statisticContentFontSize: number;
  statisticFontFamily: string;
}

const genStatisticStyle: GenerateStyle<StatisticToken> = (token: StatisticToken): CSSObject => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextSecondary,
    statisticTitleFontSize,
    colorTextHeading,
    statisticContentFontSize,
    statisticFontFamily,
  } = token;

  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      [`${componentCls}-title`]: {
        marginBottom: marginXXS,
        color: colorTextSecondary,
        fontSize: statisticTitleFontSize,
      },

      [`${componentCls}-skeleton`]: {
        paddingTop: padding,
      },

      [`${componentCls}-content`]: {
        color: colorTextHeading,
        fontSize: statisticContentFontSize,
        fontFamily: statisticFontFamily,
        [`${componentCls}-content-value`]: {
          display: 'inline-block',
          direction: 'ltr',
        },
        [`${componentCls}-content-prefix, ${componentCls}-content-suffix`]: {
          display: 'inline-block',
        },
        [`${componentCls}-content-prefix`]: {
          marginInlineEnd: marginXXS,
        },
        [`${componentCls}-content-suffix`]: {
          marginInlineStart: marginXXS,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Statistic', token => {
  const { fontSizeHeading3, fontSize, fontFamily } = token;

  const statisticToken = mergeToken<StatisticToken>(token, {
    statisticTitleFontSize: fontSize,
    statisticContentFontSize: fontSizeHeading3,
    statisticFontFamily: fontFamily,
  });
  return [genStatisticStyle(statisticToken)];
});
