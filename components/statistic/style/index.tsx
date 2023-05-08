import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  statisticTitleFontSize: number;
  statisticContentFontSize: number;
  statisticFontFamily: string;
}

interface StatisticToken extends FullToken<'Statistic'> {}

const genStatisticStyle: GenerateStyle<StatisticToken> = (token: StatisticToken): CSSObject => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextDescription,
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
        color: colorTextDescription,
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
export default genComponentStyleHook(
  'Statistic',
  (token) => {
    const statisticToken = mergeToken<StatisticToken>(token, {});
    return [genStatisticStyle(statisticToken)];
  },
  (token) => {
    const { fontSizeHeading3, fontSize, fontFamily } = token;
    return {
      statisticTitleFontSize: fontSize,
      statisticContentFontSize: fontSizeHeading3,
      statisticFontFamily: fontFamily,
    };
  },
);
