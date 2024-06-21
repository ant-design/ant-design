import type { FullToken, GenerateStyle } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
export type ComponentToken = unknown;

interface SpaceToken extends FullToken<'Space'> {
  // Custom token here
}

const genSpaceCompactStyle: GenerateStyle<SpaceToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&-block': {
        display: 'flex',
        width: '100%',
      },
      '&-vertical': {
        flexDirection: 'column',
      },
    },
  };
};

// ============================== Export ==============================
export default genSpaceCompactStyle;
