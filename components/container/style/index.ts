import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 容器横向内边距
   * @descEN Horizontal padding of container
   */
  paddingInline: number | string;
}

interface ContainerToken extends FullToken<'Container'> {
  containerPaddingInline: number | string;
}

// ============================== Styles ==============================

const genContainerStyle: GenerateStyle<ContainerToken> = (token): CSSObject => {
  const { componentCls, containerPaddingInline } = token;
  return {
    [componentCls]: {
      boxSizing: 'border-box',
      marginInline: 'auto',
      paddingInline: containerPaddingInline,
    },
    [`${componentCls}-max-width-xs`]: {
      maxWidth: token.screenXS,
    },
    [`${componentCls}-max-width-sm`]: {
      maxWidth: token.screenSM,
    },
    [`${componentCls}-max-width-md`]: {
      maxWidth: token.screenMD,
    },
    [`${componentCls}-max-width-lg`]: {
      maxWidth: token.screenLG,
    },
    [`${componentCls}-max-width-xl`]: {
      maxWidth: token.screenXL,
    },
    [`${componentCls}-max-width-xxl`]: {
      maxWidth: token.screenXXL,
    },
    [`${componentCls}-min-width-xs`]: {
      minWidth: token.screenXS,
    },
    [`${componentCls}-min-width-sm`]: {
      minWidth: token.screenSM,
    },
    [`${componentCls}-min-width-md`]: {
      minWidth: token.screenMD,
    },
    [`${componentCls}-min-width-lg`]: {
      minWidth: token.screenLG,
    },
    [`${componentCls}-min-width-xl`]: {
      minWidth: token.screenXL,
    },
    [`${componentCls}-min-width-xxl`]: {
      minWidth: token.screenXXL,
    },
  };
};

// ============================== Export ==============================
export default genStyleHooks('Container', (token) => {
  const containerToken = mergeToken<ContainerToken>(token, {
    containerPaddingInline: token.paddingLG,
  });

  return [genContainerStyle(containerToken)];
});
