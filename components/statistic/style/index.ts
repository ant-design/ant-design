import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 标题字体大小
   * @descEN Title font size
   */
  titleFontSize: number;
  /**
   * @desc 内容字体大小
   * @descEN Content font size
   */
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
    [componentCls]: {
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
export const prepareComponentToken: GetDefaultToken<'Statistic'> = (token) => {
  const { fontSizeHeading3, fontSize } = token;
  return {
    titleFontSize: fontSize,
    contentFontSize: fontSizeHeading3,
  };
};

export default genStyleHooks(
  'Statistic',
  (token) => {
    const statisticToken = mergeToken<StatisticToken>(token, {});
    return [genStatisticStyle(statisticToken)];
  },
  prepareComponentToken,
);
