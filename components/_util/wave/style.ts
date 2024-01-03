import { genComponentStyleHook } from '../../theme/internal';
import type { FullToken, GenerateStyle } from '../../theme/internal';

export interface ComponentToken {}

export interface WaveToken extends FullToken<'Wave'> {}

const genWaveStyle: GenerateStyle<WaveToken> = (token) => {
  const { componentCls, colorPrimary } = token;
  return {
    [componentCls]: {
      position: 'absolute',
      background: 'transparent',
      pointerEvents: 'none',
      boxSizing: 'border-box',
      color: `var(--wave-color, ${colorPrimary})`,

      boxShadow: `0 0 0 0 currentcolor`,
      opacity: 0.2,

      // =================== Motion ===================
      '&.wave-motion-appear': {
        transition: [
          `box-shadow ${token.motion ? 0.4 : 0}s ${token.motionEaseOutCirc}`,
          `opacity ${token.motion ? 2 : 0}s ${token.motionEaseOutCirc}`,
        ].join(','),

        '&-active': {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: 0,
        },

        '&.wave-quick': {
          transition: [
            `box-shadow ${token.motion ? 0.3 : 0}s ${token.motionEaseInOut}`,
            `opacity ${token.motion ? 0.35 : 0}s ${token.motionEaseInOut}`,
          ].join(','),
        },
      },
    },
  };
};

export default genComponentStyleHook('Wave', (token) => [genWaveStyle(token)]);
