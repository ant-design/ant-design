import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  titleFontSize: number;
  contentFontSize: number;
}

interface StatisticToken extends FullToken<'Statistic'> {}

const genStatisticStyle: GenerateStyle<StatisticToken> = (token: StatisticToken): CSSObject => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextDescription,
    titleFontSize,
    colorTextHeading,
    contentFontSize,
    fontFamily,
  } = token;

  return {
    [`${componentCls}`]: {
      ...resetComponent(token),
      [`${componentCls}-title`]: {
        marginBottom: marginXXS,
        color: colorTextDescription,
        fontSize: titleFontSize,
      },

      [`${componentCls}-skeleton`]: {
        paddingTop: padding,
      },

      [`${componentCls}-content`]: {
        color: colorTextHeading,
        fontSize: contentFontSize,
        fontFamily,
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
    const { fontSizeHeading3, fontSize } = token;
    return {
      titleFontSize: fontSize,
      contentFontSize: fontSizeHeading3,
    };
  },
);
