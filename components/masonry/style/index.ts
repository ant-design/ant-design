import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

export interface MasonryToken extends FullToken<'Masonry'> {}

export const genMasonryStyle: GenerateStyle<MasonryToken> = (token: MasonryToken): CSSObject => {
  const { componentCls, prefixCls } = token;

  return {
    [componentCls]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      minHeight: 0,
      position: 'relative',
      height: `var(--${prefixCls}-height)`,

      '& > *': {
        boxSizing: 'border-box',
        width: `var(--${prefixCls}-item-width)`,
        margin: `var(--${prefixCls}-item-margin)`,
        order: `var(--${prefixCls}-item-order)`,

        [`&${componentCls}-item-line-break`]: {
          flexBasis: '100%',
          width: 0,
          height: 0,
          margin: 0,
        },
      },
    },
  };
};

export default genStyleHooks('Masonry', (token) => [genMasonryStyle(token)]);
