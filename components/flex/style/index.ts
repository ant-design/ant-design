import type { CSSInterpolation } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import { alignItemsValues, flexWrapValues, justifyContentValues } from '../utils';

/** Component only token. Which will handle additional calculation of alias token */
// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

export interface FlexToken extends FullToken<'Flex'> {
  /**
   * @nameZH 小间隙
   * @nameEN Small Gap
   * @desc 控制元素的小间隙。
   * @descEN Control the small gap of the element.
   */
  flexGapSM: number;
  /**
   * @nameZH 间隙
   * @nameEN Gap
   * @desc 控制元素的间隙。
   * @descEN Control the gap of the element.
   */
  flexGap: number;
  /**
   * @nameZH 大间隙
   * @nameEN Large Gap
   * @desc 控制元素的大间隙。
   * @descEN Control the large gap of the element.
   */
  flexGapLG: number;
}

const genFlexStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      display: 'flex',
      margin: 0,
      padding: 0,
      '&-vertical': {
        flexDirection: 'column',
      },
      '&-rtl': {
        direction: 'rtl',
      },
      '&:empty': {
        display: 'none',
      },
    },
  };
};

const genFlexGapStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-gap-small': {
        gap: token.flexGapSM,
      },
      '&-gap-middle': {
        gap: token.flexGap,
      },
      '&-gap-large': {
        gap: token.flexGapLG,
      },
    },
  };
};

const genFlexWrapStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  const wrapStyle: CSSInterpolation = {};
  flexWrapValues.forEach((value) => {
    wrapStyle[`${componentCls}-wrap-${value}`] = { flexWrap: value };
  });
  return wrapStyle;
};

const genAlignItemsStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  const alignStyle: CSSInterpolation = {};
  alignItemsValues.forEach((value) => {
    alignStyle[`${componentCls}-align-${value}`] = { alignItems: value };
  });
  return alignStyle;
};

const genJustifyContentStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  const justifyStyle: CSSInterpolation = {};
  justifyContentValues.forEach((value) => {
    justifyStyle[`${componentCls}-justify-${value}`] = { justifyContent: value };
  });
  return justifyStyle;
};

export const prepareComponentToken: GetDefaultToken<'Flex'> = () => ({});

export default genStyleHooks(
  'Flex',
  (token) => {
    const { paddingXS, padding, paddingLG } = token;
    const flexToken = mergeToken<FlexToken>(token, {
      flexGapSM: paddingXS,
      flexGap: padding,
      flexGapLG: paddingLG,
    });
    return [
      genFlexStyle(flexToken),
      genFlexGapStyle(flexToken),
      genFlexWrapStyle(flexToken),
      genAlignItemsStyle(flexToken),
      genJustifyContentStyle(flexToken),
    ];
  },
  prepareComponentToken,
  {
    // Flex component don't apply extra font style
    // https://github.com/ant-design/ant-design/issues/46403
    resetStyle: false,
  },
);
