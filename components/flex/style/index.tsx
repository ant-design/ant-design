import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface FlexToken extends FullToken<'Flex'> {
  flexGapSmallSize: number;
  flexGapMiddleSize: number;
  flexGapLargeSize: number;
}

const genFlexStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      display: 'flex',
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
        gap: token.flexGapSmallSize,
      },
      '&-gap-middle': {
        gap: token.flexGapMiddleSize,
      },
      '&-gap-large': {
        gap: token.flexGapLargeSize,
      },
    },
  };
};

const genFlexWrapStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-wrap': {
        flexWrap: 'wrap',
      },
      '&-nowrap': {
        flexWrap: 'nowrap',
      },
      '&-wrap-reverse': {
        flexWrap: 'wrap-reverse',
      },
    },
  };
};

const genAlignItemsStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-align-center': {
        alignItems: 'center',
      },
      '&-align-start': {
        alignItems: 'start',
      },
      '&-align-end': {
        alignItems: 'end',
      },
      '&-align-flex-start': {
        alignItems: 'flex-start',
      },
      '&-align-flex-end': {
        alignItems: 'flex-end',
      },
      '&-align-self-start': {
        alignItems: 'self-start',
      },
      '&-align-self-end': {
        alignItems: 'self-end',
      },
      '&-align-normal': {
        alignItems: 'normal',
      },
      '&-align-baseline': {
        alignItems: 'baseline',
      },
      '&-align-stretch': {
        alignItems: 'stretch',
      },
    },
  };
};

const genFlexDirectionStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-direction-row': {
        flexDirection: 'row',
      },
      '&-direction-row-reverse': {
        flexDirection: 'row-reverse',
      },
      '&-direction-column': {
        flexDirection: 'column',
      },
      '&-direction-column-reverse': {
        flexDirection: 'column-reverse',
      },
    },
  };
};

const genJustifyContentStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      '&-justify-left': {
        justifyContent: 'left',
      },
      '&-justify-right': {
        justifyContent: 'right',
      },
      '&-justify-start': {
        justifyContent: 'start',
      },
      '&-justify-center': {
        justifyContent: 'center',
      },
      '&-justify-end': {
        justifyContent: 'end',
      },
      '&-justify-space-around': {
        justifyContent: 'space-around',
      },
      '&-justify-space-between': {
        justifyContent: 'space-between',
      },
      '&-justify-space-evenly': {
        justifyContent: 'space-evenly',
      },
      '&-justify-stretch': {
        justifyContent: 'stretch',
      },
      '&-justify-normal': {
        justifyContent: 'normal',
      },
      '&-justify-flex-start': {
        justifyContent: 'flex-start',
      },
      '&-justify-flex-end': {
        justifyContent: 'flex-end',
      },
    },
  };
};

export default genComponentStyleHook<'Flex'>('Flex', (token) => {
  const flexToken = mergeToken<FlexToken>(token, {
    // 这里不确定是否使用 token，在 Space 组件中是写死的
    flexGapSmallSize: 8,
    flexGapMiddleSize: 16,
    flexGapLargeSize: 24,
  });
  return [
    genFlexStyle(flexToken),
    genFlexGapStyle(flexToken),
    genFlexWrapStyle(flexToken),
    genAlignItemsStyle(flexToken),
    genFlexDirectionStyle(flexToken),
    genJustifyContentStyle(flexToken),
  ];
});
