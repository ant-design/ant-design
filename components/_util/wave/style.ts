import { genComponentStyleHook } from '../../theme/internal';
import type { FullToken, GenerateStyle } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
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
          `box-shadow 0.4s ${token.motionEaseOutCirc}`,
          `opacity 2s ${token.motionEaseOutCirc}`,
        ].join(','),

        '&-active': {
          boxShadow: `0 0 0 6px currentcolor`,
          opacity: 0,
        },
        '&.wave-quick': {
          transition: [
            `box-shadow ${token.motionDurationSlow} ${token.motionEaseInOut}`,
            `opacity ${token.motionDurationSlow} ${token.motionEaseInOut}`,
          ].join(','),
        },
      },
    },
  };
};

export default genComponentStyleHook('Wave', (token) => [genWaveStyle(token)]);
