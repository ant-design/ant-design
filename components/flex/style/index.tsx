import React from 'react';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook } from '../../theme/internal';
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

interface FlexToken extends FullToken<'Flex'> {
  // Custom token here
}

const genStyle = (
  cssProp: 'flexWrap' | 'alignItems' | 'flexDirection' | 'justifyContent',
  cssKeys:
    | typeof flexWrapValues
    | typeof alignItemsValues
    | typeof flexDirectionValues
    | typeof justifyContentValues,
) => {
  const style: Record<PropertyKey, React.CSSProperties> = {};
  cssKeys.forEach((value) => {
    style[`&-${value}`] = { [cssProp]: value };
  });
  return style;
};

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
      ...genStyle('flexWrap', flexWrapValues),
      ...genStyle('alignItems', alignItemsValues),
      ...genStyle('flexDirection', flexDirectionValues),
      ...genStyle('justifyContent', justifyContentValues),
    },
  };
};

export default genComponentStyleHook<'Flex'>('Flex', genFlexStyle);
