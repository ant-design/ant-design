import type { CSSInterpolation } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import {
  alignItemsValues,
  flexDirectionValues,
  flexWrapValues,
  justifyContentValues,
} from '../classNames';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  // Component token here
}

export interface FlexToken extends FullToken<'Flex'> {
  flexGapSM: number;
  flexGap: number;
  flexGapLG: number;
}

const genFlexStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      display: 'flex',
      position: 'relative',
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

const genFlexDirectionStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  const directionStyle: CSSInterpolation = {};
  flexDirectionValues.forEach((value) => {
    directionStyle[`${componentCls}-direction-${value}`] = { flexDirection: value };
  });
  return directionStyle;
};

const genJustifyContentStyle: GenerateStyle<FlexToken> = (token) => {
  const { componentCls } = token;
  const justifyStyle: CSSInterpolation = {};
  justifyContentValues.forEach((value) => {
    justifyStyle[`${componentCls}-justify-${value}`] = { justifyContent: value };
  });
  return justifyStyle;
};

export default genComponentStyleHook<'Flex'>('Flex', (token) => {
  const flexToken = mergeToken<FlexToken>(token, {
    flexGapSM: token.paddingXS,
    flexGap: token.padding,
    flexGapLG: token.paddingLG,
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
