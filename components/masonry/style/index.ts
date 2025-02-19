import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

export interface MasonryToken extends FullToken<'Masonry'> {}

export const genMasonryStyle: GenerateStyle<MasonryToken> = (token: MasonryToken): CSSObject => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      boxSizing: 'border-box',

      [`& > ${componentCls}-item`]: {
        boxSizing: 'border-box',
        insetInlineStart: 0,
        top: 0,
        position: 'absolute',
        overflow: 'hidden',
        transition: ['left', 'right', 'top']
          .map((prop) => `${prop} ${token.motionDurationSlow} ${token.motionEaseOut}`)
          .join(','),
      },
    },
  };
};

export default genStyleHooks('Masonry', (token) => [genMasonryStyle(token)]);
